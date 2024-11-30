import { response } from "../response";
import jwt from 'jsonwebtoken'

export default class middleWare {
    async auth(req: any, res: any, next: any) {
        let token: string = req.headers.authorization;

        if (!token || !token.startsWith("Bearer")){
            return next(new response(req , res , 'authorization' , 401 , 'token Expire!' , null))
        }

        try {
            let validToken = token.split(" ")[1]
            const decoded : any = jwt.verify(validToken , `${process.env.ACCESSKEY}`)
            if (!decoded){
                return next(new response(req , res , 'authorization' , 401 , 'token Expire!' , null))
            }
            req.user = decoded;
            next()
        } catch (error) {
            console.log('error occured in authorization >>>>' , `${error}`)
            return next(new response(req , res , 'authorization' , 401 , 'token Expire!' , null))
        }
    }

    async adminAuth(req: any, res: any, next: any) {
        let token: string = req.headers.authorization;

        if (!token || !token.startsWith("Bearer")){
            return next(new response(req , res , 'authorization' , 401 , 'token Expire!' , null))
        }

        try {
            const newToken = token.split(" ")[1]
            const decoded : any = jwt.verify(newToken , `${process.env.ADMINACCESSKEY}`)
            if (!decoded){
                return next(new response(req , res , 'authorization' , 401 , 'token Expire!' , null))
            }
            req.user = decoded;
            next()
        } catch (error) {
            console.log('error occured in authorization >>>>' , `${error}`)
            return next(new response(req , res , 'authorization' , 401 , 'token Expire!' , null))
        }
    }
}