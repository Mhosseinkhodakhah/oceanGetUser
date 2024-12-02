import cacher from "../cache/cach";
import pointModel from "../DB/models/pints";
import UserModel from "../DB/models/user";
import interConnection from "../interservice/connection";
import { response } from "../response";



const connection = new interConnection()

export default class adminController {

    async getAllUsers(req: any, res: any, next: any) {
        let cachData = await cacher.getter('admin-getAllUsers')
        let finalData;
        if (cachData) {
            finalData = cachData
        } else {
            const users = await UserModel.find()
            finalData = users;
            await cacher.setter('admin-getAllUsers', users)
        }
        return next(new response(req, res, 'get all users by admin', 200, null, finalData))
    }


    async getUser(req: any, res: any, next: any) {
        let cachData = await cacher.getter(`admin-getUser-${req.params.userId}`)
        let finalData;
        if (cachData) {
            finalData = cachData
        } else {
            const user = await UserModel.findById(req.params.userId)
            if (user) {
                await cacher.setter(`admin-getUser-${req.params.userId}`, user)
                finalData = user;
            } else {
                return next(new response(req, res, 'get specific user', 404, 'this user is not exist on database', null))
            }
        }
        return next(new response(req, res, 'get specific user', 200, null, finalData))
    }



    async getRegionUser(req: any, res: any, next: any) {
        let cachData = await cacher.getter(`admin-getRegionUser`)
        let finalData;
        if (cachData) {
            finalData = cachData;
        } else {
            const iranianUser = await UserModel.find({ country: 'iran' })
            const englandUser = await UserModel.find({ country: 'english' })
            const uae = await UserModel.find({ country: 'uae' })
            finalData = { iran: iranianUser.length, english: englandUser.length, arabestan: uae.length }
            await cacher.setter('admin-getRegionUser', finalData)
        }
        return next(new response(req, res, 'get users based on region', 200, null, finalData))
    }


    async getUserPoints(req: any, res: any, next: any) {
        let cachData = await cacher.getter(`admin-getUserPoints`)
        let finalData;
        if (cachData) {
            finalData = cachData
        } else {
            const pointsRank = await pointModel.find().populate('user').sort({ 'points': 1 })
            finalData = pointsRank;
            await cacher.setter('admin-getUserPoints', pointsRank)
        }
        return next(new response(req, res, 'get users based on points', 200, null, finalData))
    }


    async headerData(req: any, res: any, next: any){
        //total users
        const totalUsers = await UserModel.find()
        //added users on this month
        const date = (new Date((new Date().getTime()-(30*24*60*60*1000))))
        const lastMonthUsers = await UserModel.find({createdAt : {$gt : date}})

        const getLicenses = await UserModel.find({getLicense : true})

        const lessons = await connection.getLessons()

        return next(new response(req , res , 'header data' , 200 , null , {totalUsers : totalUsers.length , lastMonthUsers : lastMonthUsers.length , getLicenseUsers : getLicenses.length , lessons:lessons.data.length}))
    }


}