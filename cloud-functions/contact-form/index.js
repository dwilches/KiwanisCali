'use strict';
const fs = require("fs");
const nodemailer = require('nodemailer');
const _ = require('lodash');

const mailIntro = "Alguien ha usado el formulario Web de https://www.kiwaniscali.org para enviar el siguiente mensaje:";

const webMailOptions = {
    from: `"KiwanisCali.org (Formulario Web) 🌐" <kiwaniscali.nodemailer@gmail.com>`,
    to: "dwilches@gmail.com",
    subject: "Alguien ha enviado un mensaje usando el formulario Web️"
};

const supportMailOptions = {
    from: `"KiwanisCali.org (Exception Web) 🎈" <kiwaniscali.nodemailer@gmail.com>`,
    to: "web@kiwaniscali.org",
    subject: "Exception en Cloud Function️"
};

function sendMailInner(mailOptions) {
    return new Promise((resolve, reject) => {
        nodemailer.createTestAccount((err, account) => {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: JSON.parse(fs.readFileSync("credentials.json", 'utf8'))
            });

            transporter.sendMail(mailOptions, (error, info) => {
                if (error)
                    return reject(error);

                console.log("Message sent:", info.messageId);
                return resolve();
            });
        });
    });
}

function sendCustomerMail(message, name, phone, email) {
    const mailOptions = _.clone(webMailOptions);

    mailOptions.text = formatTextMessage(message, name, phone, email);
    console.log(`sendCustomerMail(): Will send this message: ${mailOptions.text}`);
    mailOptions.html = formatHtmlMessage(message, name, phone, email);

    return sendMailInner(mailOptions);
}

// This function should never throw, it's a best-effort message sender
function sendSupportEmail(err) {
    try {
        const mailOptions = _.clone(supportMailOptions);

        mailOptions.text = `Exception occurred: ${err}\nStack: ${err && err.stack}`;
        console.log(`sendSupportEmail(): Will send this message: ${mailOptions.text}`);
        mailOptions.html = mailOptions.text;

        return sendMailInner(mailOptions);
    }
    catch (err) {
        console.error("sendSupportEmail(): Yet another error! Argh!", err);
    }
}

function formatTextMessage(message, name, phone, email) {
    return `
        ${mailIntro}
        
        Datos del remitente:
            👱 Nombre:   ${name}
            ☎️ Teléfono: ${phone}
            📧 Email:    ${email}
        
        Mensaje:
            ${message}
    `;
}

function formatHtmlMessage(message, name, phone, email) {
    const indent = "&nbsp;&nbsp;&nbsp;&nbsp;";
    return `
        <h1>${mailIntro}</h1>
        
        <h2>Datos del remitente:</h2><br/>
        ${indent}<b>Nombre:</b> ${name}<br/>
        ${indent}<b>Teléfono:</b> ${phone}<br/>
        ${indent}<b>Email:</b> ${email}<br/>
        <br/>
        <h2>Mensaje:</h2><br/>
        <p>${message}</p>
    `;
}

function addCORSHeaders(res) {
    res.set('Allow', "OPTIONS,POST");
    res.set('Access-Control-Allow-Origin', "*");
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
}

function handleOPTIONS(req, res) {
    addCORSHeaders(res);
    res.status(200).send();
}

function handlePOST(req, res) {
    addCORSHeaders(res);
    const {message, name, phone, email} = req.body;
    sendCustomerMail(message, name, phone, email)
        .then(_ => res.status(204).send())
        .catch(err => {
            console.error("Error occurred at #1:", err);
            sendSupportEmail(err);
            return;
        })
}

function sendMailCloudFunction(req, res) {
    try {
        if (req.method === 'OPTIONS') {
            return handleOPTIONS(req, res);
        }
        else if (req.method === 'POST') {
            return handlePOST(req, res);
        }
        else {
            console.error(`Attempt to invoke the function via: ${req.method}`);
            console.error(`Body was: ${req.rawBody}`);
            return res.status(405).send();
        }
    }
    catch (err) {
        console.error("Error occurred at #2:", err);
        res.status(500).send();
        return sendSupportEmail(err);
    }
}

exports.sendMail = sendMailCloudFunction;

/*/ Test:
sendMailCloudFunction(
    {
        method: "POST",
        body: {name: "Name", email: "me@me.me", message: "Message", phone: "Phone"},
    },
    {
        status: () => ({ send: () => {}}),
        set: () => {},
    });
// */
