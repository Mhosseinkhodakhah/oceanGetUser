import mongoose, { Schema, model } from 'mongoose';
import Joi from 'joi';
import { user } from '../../userModule/interfaces';


export const MovieSchemaValidate = Joi.object({
    title: Joi.string().required(),
    genre: Joi.string().required(),
    synopsis: Joi.string().required()
});

const userSchema = new Schema<user>({
    fullName: { type: String, trim: true },

    userName: { type: String, trim: true },

    email: { type: String, trim: true },

    country: { type: String, trim: true },

    password: { type: String },

    language: { type: String, trim: true },

    resetPasswordToken: { type: String, default: null },

    school: { type: String, trim: true },

    points: { type: mongoose.Types.ObjectId, ref: 'points' },

    getLicense : {type : Boolean , default : false}
    
},{timestamps:true})


const UserModel = model<user>('user', userSchema)


export default UserModel;