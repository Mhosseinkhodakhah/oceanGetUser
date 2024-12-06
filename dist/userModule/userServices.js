"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const uuid_1 = require("uuid");
class userService {
    tokenize(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = jsonwebtoken_1.default.sign(data, `${process.env.ACCESSKEY}`, { expiresIn: '1m' });
            return token;
        });
    }
    refreshTokenize(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = jsonwebtoken_1.default.sign(data, `${process.env.ACCESSREFRESHKEY}`, { expiresIn: '5m' });
            return token;
        });
    }
    hashPass(pass) {
        return __awaiter(this, void 0, void 0, function* () {
            return 'hash';
        });
    }
    checkToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = jsonwebtoken_1.default.verify(token, `${process.env.ACCESSKEY}`);
                return decoded;
            }
            catch (error) {
                return false;
            }
        });
    }
    checkRefreshToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = jsonwebtoken_1.default.verify(token, `${process.env.ACCESSREFRESHKEY}`);
                return decoded;
            }
            catch (error) {
                return false;
            }
        });
    }
    sendEmail(email, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const transporter = nodemailer_1.default.createTransport({
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
                const resault = yield transporter.sendMail({
                    from: '"پژوهشکده ملی اقیانوس شناسی و علوم جوی"', // sender address
                    to: `${email}`, // list of receivers
                    subject: "forget password", // Subject line
                    text: "لطفا کد زیر را وارد کنید و در اپلیکیشن وارد کنید", // plain text body
                    html: `<b>${code}</b>`, // html body
                });
                return resault;
            }
            catch (error) {
                return false;
            }
        });
    }
    codeGenerator() {
        return __awaiter(this, void 0, void 0, function* () {
            const code = (0, uuid_1.v4)();
            // const number = Math.random()
            // let code: number;
            // if (number < 0.1) {
            //     code = Math.floor(number * 100000)
            // } else {
            //     code = Math.floor(number * 10000)
            // }
            return code;
        });
    }
}
exports.default = userService;
