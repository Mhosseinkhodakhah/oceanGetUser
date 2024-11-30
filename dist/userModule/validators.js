"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshRule = exports.loginRule = exports.updateRoule = exports.resetRole = exports.forgetRole = exports.registerRole = void 0;
const express_validator_1 = require("express-validator");
exports.registerRole = [
    (0, express_validator_1.body)('fullName').notEmpty().withMessage('fullName is required'),
    (0, express_validator_1.body)('userName').notEmpty().withMessage('username is required'),
    (0, express_validator_1.body)('email').notEmpty().withMessage('email address is required'),
    (0, express_validator_1.body)('email').isEmail().withMessage('wrong form email'),
    (0, express_validator_1.body)('country').notEmpty().withMessage('country is required'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('password is required'),
    (0, express_validator_1.body)('language').notEmpty().withMessage('language is required'),
];
exports.forgetRole = [
    (0, express_validator_1.body)('email').notEmpty().isString().withMessage('email address is required and should be string'),
];
exports.resetRole = [
    (0, express_validator_1.body)('password').notEmpty().withMessage('password is required and should be string'),
    (0, express_validator_1.body)('password').isString().withMessage('password is incorrect form!'),
];
exports.updateRoule = [
    (0, express_validator_1.body)('fullName').isString().withMessage('fullName is string'),
    (0, express_validator_1.body)('username').isString().withMessage('username is string'),
    (0, express_validator_1.body)('email').isString().withMessage('email address is string'),
    (0, express_validator_1.body)('country').isString().withMessage('country is string'),
];
exports.loginRule = [
    (0, express_validator_1.body)('email').notEmpty().withMessage('email address is required'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('password is required'),
];
exports.refreshRule = [
    (0, express_validator_1.body)('refreshToken').notEmpty().withMessage('refresh token is required'),
    (0, express_validator_1.body)('refreshToken').isString().withMessage('refresh token should be string'),
];
