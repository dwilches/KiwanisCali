'use strict';
const fs = require("fs");
const nodemailer = require('nodemailer');

function getFileContents(file) {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function sendMailInner(mailOptions, transportConfig) {
    return new Promise((resolve, reject) => {
        nodemailer.createTestAccount((err, account) => {
            const transporter = nodemailer.createTransport(transportConfig);

            transporter.sendMail(mailOptions, (error, info) => {
                if (error)
                    return reject(error);

                console.log("Message sent:", info.messageId);
                return resolve();
            });
        });
    });
}

function sendWebMail(textMessage, htmlMessage) {
    console.log(`sendWebMail(): Will send this message: ${textMessage}`);

    const {mailOptions, transportConfig} = getFileContents("credentials_web.json");

    mailOptions.text = textMessage;
    mailOptions.html = htmlMessage;

    return sendMailInner(mailOptions, transportConfig);
}

// This function should never throw, it's a best-effort message sender
function sendSupportEmail(textMessage, htmlMessage) {
    try {
        console.log(`sendSupportEmail(): Will send this message: ${textMessage}`);

        const {mailOptions, transportConfig} = getFileContents("credentials_support.json");

        mailOptions.text = textMessage;
        mailOptions.html = htmlMessage;

        return sendMailInner(mailOptions, transportConfig);
    }
    catch (err) {
        console.error("sendSupportEmail(): Yet another error! Argh!", err);
    }
}

exports.sendWebMail = sendWebMail;
exports.sendSupportEmail = sendSupportEmail;
