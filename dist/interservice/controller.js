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
const response_1 = require("../response");
class interServiceController {
    addPoint(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const point = req.body;
            const user = yield user_1.default.findById(point.userId);
            console.log(point.reason);
            const addPoint = yield pints_1.default.findOneAndUpdate({ user: user === null || user === void 0 ? void 0 : user._id }, { $inc: { points: +point.reason.point }, $addToSet: { pointsLogs: point.reason } });
            yield cach_1.default.reset();
            return next(new response_1.response(req, res, 'add point for user', 200, null, 'point add successfully!'));
        });
    }
    resetCache(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield cach_1.default.reset();
            return next(new response_1.response(req, res, 'reset cache for content service', 200, null, 'cache reseted successfull . . .'));
        });
    }
}
exports.default = interServiceController;
