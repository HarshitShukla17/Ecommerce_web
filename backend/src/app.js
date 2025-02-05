import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({
    path:'./.env'
});

const app=express();



app.use(cors(
    {
        origin:process.env.CORS_ORIGIN, //this is used to allow the request from the specified origin
        methods: 'GET,POST,PUT,DELETE,OPTIONS', // Allowed methods
        allowedHeaders: 'Content-Type,Authorization', // Allowed headers
        credentials:true //this is used to allow the credentials to be passed from the client to the server
    }
));


app.use(express.json({limit: "16kb"}));//this is used to parse the incoming request with JSON payloads
app.use(express.urlencoded({extended: true,limit:"16kb"}));//this is used to parse the incoming request with urlencoded payloads
app.use(express.static("public"));//this is used to store files like images, css, js etc


//import the routes
import {router} from './routes/index.js';

app.use('/api',router);


export {app};