import jwt, { JwtPayload } from 'jsonwebtoken'
import { tokenizationInterface } from './interfaces';
import nodemailer from 'nodemailer'
import mailer from './mailer';
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
export default class userService {

    async tokenize(data: Partial<tokenizationInterface>): Promise<string> {
        const token = jwt.sign(data, `${process.env.ACCESSKEY}`, { expiresIn: '1H' })
        return token
    }

    async refreshTokenize(data: Partial<tokenizationInterface>): Promise<string> {
        const token = jwt.sign(data, `${process.env.ACCESSREFRESHKEY}`, { expiresIn: '24h' })
        return token
    }

    async hashPass(pass: string): Promise<string> {
        
        return 'hash'
    }


    async checkToken(token: string) {
        try {
            const decoded = jwt.verify(token, `${process.env.ACCESSKEY}`)
            return decoded

        } catch (error) {
            return false
        }
    }


    async checkRefreshToken(token: string) {

        try {
            const decoded = jwt.verify(token, `${process.env.ACCESSREFRESHKEY}`)
            return decoded
        } catch (error) {
            return false
        }
    }


    async sendEmail(email: string, code: string) {

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

        try {
            const resault = await transporter.sendMail({
                from: '"پژوهشکده ملی اقیانوس شناسی و علوم جوی"', // sender address
                to: `${email}`, // list of receivers
                subject: "forget password", // Subject line
                text: "لطفا کد زیر را وارد کنید و در اپلیکیشن وارد کنید", // plain text body
                html: `<b>${code}</b>`, // html body
            })
            
            return resault
        } catch (error) {
            return false
        }
    }


    async codeGenerator() {
        const code = uuidv4()
        // const number = Math.random()
        // let code: number;
        // if (number < 0.1) {
        //     code = Math.floor(number * 100000)
        // } else {
        //     code = Math.floor(number * 10000)
        // }
        return code
    }

}