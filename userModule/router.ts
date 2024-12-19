import { Router, Request, Response } from 'express';


import userControlers from './controllers';
import { forgetRole, loginRule, refreshRule, registerRole, resetRole } from './validators';
import middleWare from '../middleware/middleware';
import messanger from '../rabbitMq/rabbitMq';

const controller = new userControlers()

// const rabbit = new messanger().connect()

const router = Router();

const middleware = new middleWare()
const adminAuth = new middleWare().adminAuth


router.get('/test' , (req:any , res:any , next:any)=>{
    res.status(200).send('test passed')
})

router.post('/refresh-token' , refreshRule ,controller.refreshToken)

router.get('/check-token' ,middleware.auth ,controller.checkToken)

router.get('/stages/userstage' , middleware.auth , controller.getStages)

router.get('/forget-password' , forgetRole , controller.forgetPassword)

router.get('/get-user-info' , middleware.auth ,controller.getUser)

router.get('/get-points-rank' , middleware.auth ,controller.getRankPoints)

router.get('/get-user-point' , middleware.auth , controller.getUserPoint)


export default router