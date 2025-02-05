import {user} from '../models/userModel.js';
import bcrypt from 'bcryptjs';




//user singup controller

const userSignupController=async(req,res)=>{
    //destructuring the request body
    const {fullName:name,email,password,username}=req.body;

    try {
        console.log("hello")
        if(!name || !email || !password||!username){
            throw new Error("All fields are required")
        }


        if (
            [name,email, password].some((field) => field?.trim() === "")
          ) {
            throw new Error("Please provide all the required fields");
        }

        //hashing the password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        if(!hashedPassword){
            throw new Error("Something went wrong")
        }

        //checking if the user already exists
        const userExists=await user.findOne({email:email});
        
        if(userExists)
        {
            throw new Error("User already exists")
        }

        //creating the user

        const newUser=await user.create({
            name,
            email,
            username,
            password:hashedPassword
        })

        if(!newUser){
            throw new Error("Something went wrong in creating the user")
        }

        res.status(201)
        .json({
            data:newUser,
            success:true,
            error:false,
            message:"User created successfully"
        })

        
        
    } catch (error) {
        res.json({
            message:error.message,
            error:true,
            success:false

        })
    }
}

export {userSignupController}