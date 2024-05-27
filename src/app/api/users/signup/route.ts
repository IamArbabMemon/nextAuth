import {connect} from '@/dbConfig/dbConfig';
import userModel from '@/models/user.model';
import bcrypt from 'bcryptjs';
import { sendEmail } from '@/Helpers/mailer';
import { NextRequest,NextResponse } from 'next/server';

connect();

export async function POST(req:NextRequest){
    try {
        
        const reqBody = await req.json();
        const {username,email,password} = reqBody;

        console.log(reqBody);

        const user = await userModel.findOne({username:username});
        
        if(user)
         return NextResponse.json({Error:"User already exists"});
        
        const hashedPass = await bcrypt.hash(password,8); 

    const newCreatedUser = await userModel.create({
        username,
        email,
        password:hashedPass
       }); 
  
       

      const emailSenderResponse = await sendEmail({email,emailType:"VERIFY", userId:newCreatedUser._id});

        console.log(await userModel.findById(newCreatedUser._id));
        
      const userObjectWithoutPassword= newCreatedUser.toObject();

       delete userObjectWithoutPassword.password;

       return NextResponse.json({message:"User has been registered",success:true,user:userObjectWithoutPassword,statusCode:200});

    } catch (error) {
        return NextResponse.json({error:error,statusCode:500});

    }
}