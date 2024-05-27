import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema : Schema = new mongoose.Schema({
        username:{
            type:String,
            required:[true,'Please Provide Username'],
            unique:true
        },
        email:{
            type:String,
            required:[true,'Please Provide Email'],
            unique:true
        },

        password:{
            type:String,
            required:[true,'Please Provide Email'],
        },

        isVerified:{
            type:Boolean,
            default:false
        },

        isAdmin:{
            type:Boolean,
            default:false
        },

        forgotPasswordToken:String,
        
        forgotPasswordTokenExpiry:Date,
        
        verificationToken:String,
        
        verificationTokenExpiry:Date

});

const usersModel = mongoose.models.users || mongoose.model('users',userSchema);

export default usersModel;