"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieSchemaValidate = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
exports.MovieSchemaValidate = joi_1.default.object({
    title: joi_1.default.string().required(),
    genre: joi_1.default.string().required(),
    synopsis: joi_1.default.string().required()
});
const userSchema = new mongoose_1.Schema({
    fullName: { type: String, trim: true },
    userName: { type: String, trim: true },
    email: { type: String, trim: true },
    country: { type: String, trim: true },
    password: { type: String },
    language: { type: String, trim: true },
    resetPasswordToken: { type: String, default: null },
    school: { type: String, trim: true },
    points: { type: mongoose_1.default.Types.ObjectId, ref: 'points' },
    getLicense: { type: Boolean, default: false },
    profile: { type: String, default: '' }
}, { timestamps: true });
const UserModel = (0, mongoose_1.model)('user', userSchema);
exports.default = UserModel;
