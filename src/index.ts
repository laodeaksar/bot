import { Client, LocalAuth } from "whatsapp-web.js";

import puppeteerOptions from "./configs/puppeteer";
import qrListener from "./listeners/qr";
import readyListener from "./listeners/ready";
import messageListener from "./listeners/message";

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer:
        process.env.NODE_ENV === 'production' ? puppeteerOptions : undefined,
});

client.on('qr', qrListener);
client.on('ready', readyListener);
client.on('message', messageListener);

client.initialize()