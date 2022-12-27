import axios from "axios";

const ChatGPTRequest = async (text: any) => {

    const result = {
        success: false,
        data: null,
        message: "",
    }

    return await axios({
        method: 'post',
        url: 'https://api.openai.com/v1/completions',
        data: {
            model: "text-davinci-003",
            prompt: text,
            max_tokens: 1000,
            temperature: 0
        },
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
            "Accept-Language": "in-ID",
            "Authorization": `Bearer ${process.env.OPEN_AI_API_KEY}`,
        },
    })
        .then((response) => {
            if (response.status == 200) {
                result.success = true;
                result.data = response?.data?.choices?.[0].text || 'Aku gak tau';
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

const ChatAIHandler = async (text: any, msg: any) => {

    const cmd = text.split('/');

    if (cmd.length < 2) {
        return msg.reply('Format Salah. ketik *#ask/your question*');
    }

    msg.reply('sedang diproses, tunggu bentar ya.');

    const question = cmd[1];
    const response = await ChatGPTRequest(question)

    if (!response.success) {
        return msg.reply('Terjadi kesalahan.');
    }

    return msg.reply(response.data);
}

export default ChatAIHandler