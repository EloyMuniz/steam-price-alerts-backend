import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,

    secure: false,//Usar "false" para ambiente de desenvolvimento
    auth: {
        user: "noreplypricealerts@gmail.com",
        pass: process.env.PASSGMAIL,
    },
    tls: {
        rejectUnauthorized: false, //Usar "false" para ambiente de desenvolvimento
    },
});
//Função de envio de email
export function sendEmail(use_email: string, emailBody: string, subject: string) {

    const mailOptions = {
        from: "noreplypricealerts@gmail.com",
        to: [use_email],
        subject: subject,
        html: emailBody,
    };


    transporter.sendMail(mailOptions, function (error) {
        if (error) {
            throw error
        } else {
            console.log("Email enviado com sucesso!")
        }
    });
}

