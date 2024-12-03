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



    async overView(req: any, res: any, next: any) {
        let cachData = await cacher.getter('admin-overView')
        let finalData;
        if (cachData) {
            finalData = cachData
        } else {


            //total users
            const totalUsers = await UserModel.find()
            const totalUsersData = {
                month: [
                    "فروردین",
                    "اردیبهشت",
                    "خرداد",
                    "تیر",
                    "مرداد",
                    "شهریور",
                    "مهر",
                    "آبان",
                    "آذر",
                    "دی",
                    "بهمن",
                    "اسفند",
                ],
                counts: [5, 10, 20, 40, 6, 18, 7, 5, 70, 12, 16, 20],
                percent: 25,
                total: totalUsers.length
            }
            //added users on this month
            const date = (new Date((new Date().getTime() - (30 * 24 * 60 * 60 * 1000))))

            const lastMonthUsers = await UserModel.find({ createdAt: { $gt: date } })
            const addedUsersData = {
                month: [
                    "فروردین",
                    "اردیبهشت",
                    "خرداد",
                    "تیر",
                    "مرداد",
                    "شهریور",
                    "مهر",
                    "آبان",
                    "آذر",
                    "دی",
                    "بهمن",
                    "اسفند",
                ],
                counts: [5, 10, 20, 40, 6, 18, 7, 5, 70, 12, 16, 20],
                percent: -5,
                total: lastMonthUsers.length
            }
            // users that get license
            const getLicenses = await UserModel.find({ getLicense: true })
            const getLicenseUserData = {
                month: [
                    "فروردین",
                    "اردیبهشت",
                    "خرداد",
                    "تیر",
                    "مرداد",
                    "شهریور",
                    "مهر",
                    "آبان",
                    "آذر",
                    "دی",
                    "بهمن",
                    "اسفند",
                ],
                counts: [5, 10, 20, 40, 6, 18, 7, 5, 70, 12, 16, 20],
                percent: 6,
                total: getLicenses.length
            }
            const lessons = await connection.getLessons()
            const lessonsData = {
                month: [
                    "فروردین",
                    "اردیبهشت",
                    "خرداد",
                    "تیر",
                    "مرداد",
                    "شهریور",
                    "مهر",
                    "آبان",
                    "آذر",
                    "دی",
                    "بهمن",
                    "اسفند",
                ],
                counts: [5, 10, 20, 40, 6, 18, 7, 5, 70, 12, 16, 20],
                percent: 0,
                total: 0
            }

            // make ready for header data
            const headerData = {
                ['همه  ی کاربر ها']: totalUsersData,
                ['کاربر های اضافه شده']: addedUsersData,
                ['کاربر های موفق']: getLicenseUserData,
                ['همه ی درس ها']: lessonsData
            }

            const piChart = [{ label: 'eourop', value: 150 }, { label: 'asia', value: 50 }, { label: 'africa', value: 60 }, { label: 'america', value: 80 }]

            const barChart = {
                month: [
                    "فروردین",
                    "اردیبهشت",
                    "خرداد",
                    "تیر",
                    "مرداد",
                    "شهریور",
                    "مهر",
                    "آبان",
                    "آذر",
                    "دی",
                    "بهمن",
                    "اسفند",
                ],
                series: [
                    { name: 'name1', data: [7, 8, 10, 15, 3, 9, 17, 25, 16, 17, 11, 12] },
                ]
            }

            const cityChart = {
                cities: ['iran', 'vancover', 'otava', 'dubai'],
                series: [
                    { name: '2022', data: [50, 60, 80, 30] },
                    { name: '2023', data: [15, 16, 18, 13] },
                ]
            }

            const levelData = lessons.data.levelData

            console.log(headerData)
            finalData = { header: headerData, piChart: piChart, cityChart: cityChart, barChart: barChart, levelBarChart: levelData }
            await cacher.setter('admin-overView' , finalData)
        }


        return next(new response(req, res, 'header data', 200, null, finalData))


    }


}