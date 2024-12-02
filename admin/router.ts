import { Router } from "express";
import middleWare from "../middleware/middleware";
import adminController from "./controller";


const adminRouter = Router()
const adminAuth = new middleWare().adminAuth
const controller = new adminController()

adminRouter.get('/get-all-users' , adminAuth,controller.getAllUsers)

adminRouter.get('/get-user/:userId' , adminAuth,controller.getUser)

adminRouter.get('/get-region-users' ,adminAuth, controller.getRegionUser)

adminRouter.get('/get-user-points' ,adminAuth, controller.getUserPoints)

adminRouter.get('/header-data' , adminAuth , controller.headerData )

export default adminRouter;