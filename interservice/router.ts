import express , {Router} from 'express'
import interServiceController from './controller';


const interserviceRouter = Router();

const controller = new interServiceController()

interserviceRouter.put('/put-new-point' , controller.addPoint)

interserviceRouter.put('/reset-cache' , controller.resetCache )

export default interserviceRouter;