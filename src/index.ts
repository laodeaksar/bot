import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

import ChatAIHandler from "./utils/chat_ai";
import EditPhotoHandler from "./utils/edit_foto";

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true })
})

client.on('ready', () => {
    console.log("ready");
})

client.on('message', async(msg) => {
    const text = msg.body.toLowerCase() || '';

    //check status
    if (text === '!ping') {
        msg.reply('pong');
    }

    // edit_bg/bg_color
    if (text.includes("#edit_bg/")) {
        await EditPhotoHandler(text, msg);
    }
    // #ask/question?
    if (text.includes("#ask/")) {
        await ChatAIHandler(text, msg);
    }});

client.initialize()