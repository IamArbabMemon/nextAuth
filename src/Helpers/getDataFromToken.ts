import {connect} from '@/dbConfig/dbConfig';
import userModel from '@/models/user.model';
import { verify } from 'crypto';
import  jwt  from 'jsonwebtoken';
import { NextRequest,NextResponse } from 'next/server';

export const getDataFromToken = (req:NextRequest)=>{
    try {
        const token = req.cookies.get("token")?.value || "";
        
        if(token ==="")
       throw new Error("Please login to get the information");
       
        const decodeToken:any =  jwt.verify(token,process.env.SECRET || 'secret');
          
          return decodeToken.id;

    } catch (error:any) {
        throw new Error(error.message);
    }
} 