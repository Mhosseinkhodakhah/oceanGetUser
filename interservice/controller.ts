import cacher from "../cache/cach"
import pointModel from "../DB/models/pints"
import UserModel from "../DB/models/user"
import { response } from "../response"



export default class interServiceController {

    async addPoint(req: any, res: any, next: any) {
        console.log(req.body)
        const point = req.body
        const user = await UserModel.findById(point.userId)
        console.log(point.reason)
        const addPoint = await pointModel.findOneAndUpdate({user : user?._id} , {$inc : {points : +point.reason.point }  , $addToSet:{pointsLogs : point.reason}}) 
        await cacher.reset()
        return next(new response(req , res , 'add point for user' , 200 , null , 'point add successfully!'))
    }


    async resetCache(req: any, res: any, next: any){
        await cacher.reset()
        return next(new response(req , res , 'reset cache for content service' , 200 , null , 'cache reseted successfull . . .'))
    }

    
}