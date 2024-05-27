import {connect} from '@/dbConfig/dbConfig';
import { NextRequest,NextResponse } from 'next/server';

connect();

export async function GET(req:NextRequest){
    try {
        
        const response =  NextResponse.json({message:'User has been logout',success:true,statusCode:200});
        
        
        response.cookies.set('token',"",{httpOnly:true,expires:new Date(0)});

        return response;
        
    } catch (error:any) {
        return NextResponse.json({errorMessage:error.message,success:false,statusCode:500})
    }

}