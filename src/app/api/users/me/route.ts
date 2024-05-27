import {connect} from '@/dbConfig/dbConfig';
import userModel from '@/models/user.model';
import {getDataFromToken} from '@/Helpers/getDataFromToken'
import { NextRequest,NextResponse } from 'next/server';

connect();

export async function GET(req:NextRequest){
    try {
        const userId = getDataFromToken(req);
        
        console.log(userId);

        if(!userId)
            throw new Error('USER ID NOT FOUND !!');

        const user = await userModel.findById(userId).select("-password");

        return NextResponse.json({user:user,success:true,statusCode:200});

    } catch (error:any) {
        return NextResponse.json({errorMessage:error.message ,success:false,statusCode:500});
    }
        
}