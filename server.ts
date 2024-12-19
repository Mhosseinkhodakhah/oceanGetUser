import express, { Request, Response } from 'express';

import { body, validationResult } from 'express-validator';

import path from 'path'
import dotenv from 'dotenv'
import morgan from "morgan"
import winston from "winston" // this packages for logging the requests
import expressWinston from "express-winston" // logger
import fileUpload from "express-fileupload"  // for uploading file
import cookieParser from "cookie-parser"     // for cookie parsing
import mongoSanitize from "express-mongo-sanitize" // for prevent of injection query in database
import helmet from "helmet" // security
// import xss from "xss-clean" // security
import rateLimit from "express-rate-limit" // ratelimiting
import hpp from "hpp" // security
import cors from "cors" // security
import nodemailer from 'nodemailer'
import responseTime from 'response-time' // response time
import { createLogger, format, transports } from 'winston'
import router from './userModule/router';
import connection from './DB/connection';
import messanger from './rabbitMq/rabbitMq';
import interserviceRouter from './interservice/router';
import adminRouter from './admin/router';
const { combine, timestamp, label, prettyPrint } = format;



dotenv.config({ path: './config/config.env' });     // config file

// configuration app 
const app = express();

// Sanitize data
app.use(mongoSanitize());

connection()

// // securing connection 
// app.use(helmet()); // Set security headers
// // app.use(xss()); // Prevent XSS attacks
// app.use(hpp());
// app.use(cors());



//set logger
app.use(
    expressWinston.logger({
        transports: [new winston.transports.Console(), new (winston.transports.File)({ filename: 'myLogs.log' })],
        format: format.combine(
            label({ label: 'right meow!' }),
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            prettyPrint()
        ),
        statusLevels: true,
        meta: true,
        msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
        expressFormat: true,
        ignoreRoute() {
            return false;
        },
    })
);



// inside logger!!!!
winston.configure({
    format: format.combine(

        label({ label: 'right meow!' }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        prettyPrint()
    ),
    transports: [
        new (winston.transports.File)({ filename: 'inside.log' }),
        // new winston.transports.Console()
    ],
})


app.use(express.json({ limit: "25mb" }));

// Handle unhandled promise rejections
process.on("unhandledRejection", (err : any, promise) => {
    console.log(`Error: ${err.message}`);
});

const port = process.env.PORT || 5005;

app.listen(port, () => {
    console.log('user get server is running successfully . . .')
})


app.use('/app' , router)

app.use('/app/interservice' , interserviceRouter)

app.use('/' , adminRouter)







