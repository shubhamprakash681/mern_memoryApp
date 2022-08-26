import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';

import { errorMiddleware } from './middleware/error.js';


const app = express()
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// route imports
import postsRouter from './routes/postsRoute.js'

// route use
app.use('/', postsRouter);



// middleware for errors
app.use(errorMiddleware)



export default app;