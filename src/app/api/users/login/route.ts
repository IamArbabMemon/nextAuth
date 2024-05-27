import {connect} from '@/dbConfig/dbConfig';
import userModel from '@/models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { NextRequest,NextResponse } from 'next/server';

connect();


export async function POST(req:NextRequest){

/*
take email and pass from reqbody and check that is there email and password exist or not 
match credential from database
using bcrypt to compare the hashed password to the plain one 
if ok then create jwt token 
set the token to user cookie
*/


try {
    
    const reqBody = await req.json();

    const {email,password} = reqBody;

    console.log(email, password);

    const user = await userModel.findOne({email:email});

    if(!user)
        return NextResponse.json({ErrorMessage:"User not found",success:false,statusCode:404});
    
    const passIsCorrect = await bcrypt.compare(password,user.password);

    if(!passIsCorrect)
        return NextResponse.json({ErrorMessage:"Bad credentials",success:false,statusCode:404});

    const tokenPayLoad = {
        id:user._id,
        username:user.username,
        email:user.email
    };

    const token = await jwt.sign(tokenPayLoad, process.env.SECRET || 'secret',{expiresIn:"1d"});
    
    return NextResponse.json({
        message:"Login success",
        success:true,
        statusCode:200
    }).cookies.set("token",token,{httpOnly:true});


} catch (error) {
    
}




}