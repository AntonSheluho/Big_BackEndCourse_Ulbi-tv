const nodemailer = require('nodemailer');



class MailService {

    async createTestAcc() {
        const acc = await nodemailer.createTestAccount()
        return acc
    }

    constructor() {
        this.testAccount = this.createTestAcc();
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth:{
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Activation account on ' + process.env.API_URL,
            text: '',
            html: `
                <div>
                    <h1>For activation you should go for link</h1>
                    <a href="${link}" >${link}</a>
                </div>
            `
        })
    }
}

// module.exports = new MailService

async function sendActivationMail(to, link) {
    const acc = await nodemailer.createTestAccount()
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth:{
            user: acc.user,
            pass: acc.pass,
        }
    })
    const info = await transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: 'Activation account on ' + process.env.API_URL,
        text: '',
        html: `
            <div>
                <h1>For activation you should go for link</h1>
                <a href="${link}" >${link}</a>
            </div>
        `
    })

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}


module.exports = {
    sendActivationMail
}