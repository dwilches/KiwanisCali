'use strict';
const fs = require("fs");
const nodemailer = require('nodemailer');

const messageBody = "Me devuelves la llamada?";
const phone = "8989898";
const email = "pedro@pepe.com";

const mailIntro = "Alguien ha usado el formulario Web de https://www.kiwaniscali.org para enviar el siguiente mensaje:";
const mailOptions = {
    from: `"KiwanisCali.org (Formulario Web) 🌐" <kiwaniscali.nodemailer@gmail.com>`,
    to: "dwilches@gmail.com",
    subject: "Alguien ha enviado un mensaje usando el formulario Web️"
};

function sendMail(messageBody, phone, email) {
    mailOptions.text = formatTextMessage(messageBody, phone, email);
    console.log(`sendMail(): Will send this message: ${mailOptions.text}`);
    mailOptions.html = formatHtmlMessage(messageBody, phone, email);

    nodemailer.createTestAccount((err, account) => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: JSON.parse(fs.readFileSync("credentials.json", 'utf8'))
        });

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.error("Error occurred at #1:", error);
            }
            console.log("Message sent:", info.messageId);
        });
    });
}

function formatTextMessage(messageBody, phone, email) {
    return `
        ${mailIntro}
        
        Datos del remitente:
            ☎️ Teléfono: ${phone}
            📧 Email:    ${email}
        
        Mensaje:
            ${messageBody}
    `;
}

function formatHtmlMessage(messageBody, phone, email) {
    const indent = "&nbsp;&nbsp;&nbsp;&nbsp;";
    return `
        <h1>${mailIntro}</h1>
        
        <h2>Datos del remitente:</h2><br/>
        ${indent}<b>Teléfono:</b> ${phone}<br/>
        ${indent}<b>Email:</b> ${email}<br/>
        <br/>
        <h2>Mensaje:</h2><br/>
        <p>${messageBody}</p>
    `;
}

exports.sendMailPOST = (req, res) => {
    if (req.method !== 'POST') {
        console.error(`Attempt to invoke the function via: ${req.method}`);
        console.error(`Body was: ${req.rawBody}`);
        return res.status(405).send("");
    }

    try {
        const {messageBody, phone, email} = req.body;
        sendMail(messageBody, phone, email);
        res.status(200).send(req.body);
    }
    catch (error) {
        console.error("Error occurred at #2:", error);
    }
};
