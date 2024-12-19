import nodemailer from 'nodemailer'


export default async () => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'kianlucifer0098@gmail.com',
            pass: 'cnno pezo wooi qkpl',
        },
    });
    transporter.verify().then(console.log).catch(console.error);
    return transporter
}