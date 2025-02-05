import dontenv from 'dotenv';
import {app} from './app.js';
import {connectDB} from './db/index.js';

dontenv.config({
    path:'./.env'
});

const PORT = process.env.PORT || 8080;
connectDB().then(()=>{
    app.on('error', (error)=>{
        console.log(`Error : ${error.message}`);
    });
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    }
    );
}).catch((error)=>{
    console.log(`Error : ${error.message}`);
});



