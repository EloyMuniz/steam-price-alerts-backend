import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,

    secure: true,//Usar "false" para ambiente de desenvolvimento
    auth: {
        user: "@gmail.com",
        pass: process.env.PASSGMAIL,
    },
    tls: {
        rejectUnauthorized: true, //Usar "false" para ambiente de desenvolvimento
    },
});
//Função de envio de email
export function sendEmail(use_email: string, emailBody: string, subject: string) {

    const mailOptions = {
        from: "@gmail.com",
        to: [use_email],
        subject: subject,
        html: emailBody,
    };


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error(error);
        } else {
            console.log("Email enviado com sucesso!")
        }
    });
}

