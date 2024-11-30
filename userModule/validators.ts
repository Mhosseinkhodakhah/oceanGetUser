import { body, validationResult } from 'express-validator';


export const registerRole = [
    body('fullName').notEmpty().withMessage('fullName is required'),
    body('userName').notEmpty().withMessage('username is required'),
    body('email').notEmpty().withMessage('email address is required'),
    body('email').isEmail().withMessage('wrong form email'),
    body('country').notEmpty().withMessage('country is required'),
    body('password').notEmpty().withMessage('password is required'),
    body('language').notEmpty().withMessage('language is required'),
];

export const forgetRole = [
    body('email').notEmpty().isString().withMessage('email address is required and should be string'),
];

export const resetRole = [
    body('password').notEmpty().withMessage('password is required and should be string'),
    body('password').isString().withMessage('password is incorrect form!'),
];



export const updateRoule = [
    body('fullName').isString().withMessage('fullName is string'),
    body('username').isString().withMessage('username is string'),
    body('email').isString().withMessage('email address is string'),
    body('country').isString().withMessage('country is string'),
];



export const loginRule = [
    body('email').notEmpty().withMessage('email address is required'),
    body('password').notEmpty().withMessage('password is required'),
];

export const refreshRule = [
    body('refreshToken').notEmpty().withMessage('refresh token is required'),
    body('refreshToken').isString().withMessage('refresh token should be string'),
];