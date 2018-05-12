'use strict';

const {sendSupportEmail, sendWebMail} = require("./sendMail");

const mailIntro = "Alguien ha usado el formulario Web de https://www.kiwaniscali.org para enviar el siguiente mensaje:";

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

    let textMessage = formatTextMessage(message, name, phone, email);
    let htmlMessage = formatHtmlMessage(message, name, phone, email);

    sendWebMail(textMessage, htmlMessage)
        .catch(err => {
            console.error("Error occurred at #1:", err);
            // Kiwanis' Gmail account may have an authentication issue, try to send the same email to support
            // using a more reliable service (not so picky as Gmail).
            const errorMessage = `An exception occurred while delivering to main Web account though:`;
            textMessage = `${textMessage}\n\n${errorMessage} ${err}`;
            htmlMessage = `${htmlMessage}<br/><pre><strong>${errorMessage}</strong> ${err}</pre>`;
            return sendSupportEmail(textMessage, htmlMessage);
        })
        .then(_ => {
            // Success as the email was send to either the main account or the support one
            res.status(204).send();
        })
        .catch(err => {
            console.error("Error occurred at #2:", err);
            // There is something seriously bad, don't send the message anymore.
            return res.status(500).send();
        });
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
        console.error("Error occurred at #3:", err);
        res.status(500).send();
        sendSupportEmail(err, `<pre>err</pre>`); // Intentionally not waiting for response
        return
    }
}

exports.sendMail = sendMailCloudFunction;
