import express from "express";
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import uuid from "uuid";
import fileUpload from 'express-fileupload';
import TelegramBot from 'node-telegram-bot-api';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload({}));
app.use(cors({origin: true}));

const token = '7192604167:AAEqdRty9vz7RToy1XVSGrHKEbE6t5W9lo0';
const webAppUrl = 'https://telegram-bot-picture-react.vercel.app/';

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {

  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/start') {
    await bot.sendMessage(chatId, 'Вітаю тебе в нашому чат-боті');

    await bot.sendMessage(chatId, 'Завантаж свою картинку нижче', {
      reply_markup: {
        keyboard: [
          [{ text: 'Заповни форму', web_app: { url: webAppUrl } }]
        ]
      }
    })
  }

  if (msg?.web_app_data?.data) {
    try {
      
      const data = JSON.parse(msg?.web_app_data?.data);

      await bot.sendMessage(chatId, 'Good' + data.base64Image);

    } catch (e) {
      console.log(e);
    }
  }
});

app.get("/", (req, res) => res.send({'name':'Maria'}));

app.listen(port, () => console.log("Server ready on port 5000."));

module.exports = app;