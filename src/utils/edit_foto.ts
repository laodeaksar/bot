import axios from "axios";

const EditPhotoRequest = async (base64: any, bg_color: any) => {

    const result = {
        success: false,
        base64: null,
        message: "",
    }

    return await axios({
        method: 'post',
        url: 'https://api.remove.bg/v1.0/removebg',
        data: {
            image_file_b64: base64,
            bg_color: bg_color
        },
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
            "X-Api-Key": process.env.RM_BG_API_KEY,
        },
    })
        .then((response) => {
            if (response.status == 200) {
                result.success = true;
                result.base64 = response.data.data.result_b64
            } else {
                result.message = "Failed response";
            }

            return result;
        })
        .catch((error) => {
            result.message = "Error : " + error.message;
            return result;
        });
}

const EditPhotoHandler = async (text: any, msg: any) => {
    const cmd = text.split('/');
    if (cmd.length < 2) {
        return msg.reply('Format Salah. ketik *edit_bg/warna*');
    }

    if (msg.hasMedia) {
        if (msg.type != 'image') {
            return msg.reply('hanya bisa edit dengan format image.');
        }

        msg.reply('sedang diproses, tunggu bentar ya.');

        const media = await msg.downloadMedia();

        if (media) {
            const color = cmd[1];
            const newPhoto = await EditPhotoRequest(media.data, color)

            if (!newPhoto.success) {
                return msg.reply('Terjadi kesalahan.');
            }

            const chat = await msg.getChat();
            media.data = newPhoto.base64;
            chat.sendMessage(media, { caption: 'ini hasilnya' })
        }
    }
}

export default EditPhotoHandler