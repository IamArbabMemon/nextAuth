import {connect} from '@/dbConfig/dbConfig';
import userModel from '@/models/user.model';
import { NextRequest,NextResponse } from 'next/server';

connect();


export async function POST(req:NextRequest){

    /*
    1. take token from body 
    2. check that there is token 
    3. check that token is matched the token we have in database and its expiry is also matched
    4. make the token and its expiry undefined in the database
    5. send the response with success.

 verificationToken:String,
        
        verificationTokenExpiry:Date

    */

    try {
        
        const reqbody =  await req.json();
        const {token} = reqbody;

        if(!token)
            return NextResponse.json({ErrorMessage:"Token is empty",success:false,statusCode:400});

        const user = await userModel.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});

        if(!user)
            return NextResponse.json({ErrorMessage:"Invalid token",success:false,statusCode:400});

        user.isVerified=true;
        user.verificationToken=undefined;
        user.verificationTokenExpiry=undefined;

        await user.save();

        return NextResponse.json({Message:"Verification successful",success:true,statusCode:200});

    } catch (error:any) {
        return NextResponse.json({ErrorMessage:error.message,success:false,statusCode:500});
    }


}