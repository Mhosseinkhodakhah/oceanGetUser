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
const cach_1 = __importDefault(require("../cache/cach"));
const pints_1 = __importDefault(require("../DB/models/pints"));
const user_1 = __importDefault(require("../DB/models/user"));
const connection_1 = __importDefault(require("../interservice/connection"));
const response_1 = require("../response");
const connection = new connection_1.default();
class adminController {
    getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let cachData = yield cach_1.default.getter('admin-getAllUsers');
            let finalData;
            if (cachData) {
                finalData = cachData;
            }
            else {
                const users = yield user_1.default.find();
                finalData = Object.assign({}, users);
                yield cach_1.default.setter('admin-getAllUsers', users);
            }
            return next(new response_1.response(req, res, 'get all users by admin', 200, null, finalData));
        });
    }
    getUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let cachData = yield cach_1.default.getter(`admin-getUser-${req.params.userId}`);
            let finalData;
            if (cachData) {
                finalData = cachData;
            }
            else {
                const user = yield user_1.default.findById(req.params.userId);
                if (user) {
                    yield cach_1.default.setter(`admin-getUser-${req.params.userId}`, user);
                    finalData = user;
                }
                else {
                    return next(new response_1.response(req, res, 'get specific user', 404, 'this user is not exist on database', null));
                }
            }
            return next(new response_1.response(req, res, 'get specific user', 200, null, finalData));
        });
    }
    getRegionUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let cachData = yield cach_1.default.getter(`admin-getRegionUser`);
            let finalData;
            if (cachData) {
                finalData = cachData;
            }
            else {
                const iranianUser = yield user_1.default.find({ country: 'iran' });
                const englandUser = yield user_1.default.find({ country: 'english' });
                const uae = yield user_1.default.find({ country: 'uae' });
                finalData = { iran: iranianUser.length, english: englandUser.length, arabestan: uae.length };
                yield cach_1.default.setter('admin-getRegionUser', finalData);
            }
            return next(new response_1.response(req, res, 'get users based on region', 200, null, finalData));
        });
    }
    getUserPoints(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let cachData = yield cach_1.default.getter(`admin-getUserPoints`);
            let finalData;
            if (cachData) {
                finalData = cachData;
            }
            else {
                const pointsRank = yield pints_1.default.find().populate('user').sort({ 'points': 1 });
                finalData = pointsRank;
                yield cach_1.default.setter('admin-getUserPoints', pointsRank);
            }
            return next(new response_1.response(req, res, 'get users based on points', 200, null, finalData));
        });
    }
    overView(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let cachData = yield cach_1.default.getter('admin-overView');
            let finalData;
            if (cachData) {
                finalData = cachData;
            }
            else {
                //total users
                const totalUsers = yield user_1.default.find();
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
                };
                //added users on this month
                const date = (new Date((new Date().getTime() - (30 * 24 * 60 * 60 * 1000))));
                const lastMonthUsers = yield user_1.default.find({ createdAt: { $gt: date } });
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
                };
                // users that get license
                const getLicenses = yield user_1.default.find({ getLicense: true });
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
                };
                const lessons = yield connection.getLessons();
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
                };
                // make ready for header data
                const headerData = {
                    ['همه  ی کاربر ها']: totalUsersData,
                    ['کاربر های اضافه شده']: addedUsersData,
                    ['کاربر های موفق']: getLicenseUserData,
                    ['همه ی درس ها']: lessonsData
                };
                const piChart = [{ label: 'eourop', value: 150 }, { label: 'asia', value: 50 }, { label: 'africa', value: 60 }, { label: 'america', value: 80 }];
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
                };
                const cityChart = {
                    cities: ['iran', 'vancover', 'otava', 'dubai'],
                    series: [
                        { name: '2022', data: [50, 60, 80, 30] },
                        { name: '2023', data: [15, 16, 18, 13] },
                    ]
                };
                const levelData = lessons.data.levelData;
                console.log(headerData);
                finalData = { header: headerData, piChart: piChart, cityChart: cityChart, barChart: barChart, levelBarChart: levelData };
                yield cach_1.default.setter('admin-overView', finalData);
            }
            return next(new response_1.response(req, res, 'header data', 200, null, finalData));
        });
    }
}
exports.default = adminController;
