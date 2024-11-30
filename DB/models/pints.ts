import mongoose, { Schema, model, mongo } from "mongoose";
import joi from 'joi'
import { pointDB } from "../../userModule/interfaces";




const pointSchema = new Schema<pointDB>({
    points: { type: Number , default : 0},
    pointsLogs: [{
        reason: { type: String },
        point: { type: Number }
    }],
    user : {type : mongoose.Types.ObjectId , ref : 'user'}
})


const pointModel = model<pointDB>('points' , pointSchema)


export default pointModel;