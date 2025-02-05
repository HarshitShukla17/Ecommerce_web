import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const connectDB=async()=>{
    try {
        const connectionInstance=await mongoose.connect(
            `${process.env.MONGO_URI}/${DB_NAME}`
        );

        //get the database name
        console.log(`MONGODB connected: ${connectionInstance.connection.db.databaseName}`);
        console.log(`MONGODB connected: ${connectionInstance.connection.host}`);//host is the server
    } catch (error) {
        console.log("MongoDB connection failed");
        process.exit(1);
    }
}

export {connectDB};