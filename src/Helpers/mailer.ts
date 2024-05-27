import nodemailer from 'nodemailer';
import usersModel from '@/models/user.model';
import bcrypt from 'bcryptjs';

  export const sendEmail = async ({email,emailType,userId}:any)=>{

    try {
      const hashedToken = await bcrypt.hash(userId.toString(),10);
      
      if(emailType==="VERIFY"){
          await usersModel.findByIdAndUpdate(userId,{
         $set:{ verificationToken:hashedToken,
          verificationTokenExpiry:Date.now()+3600000
         }
        },{new:true});
       
      }else if(emailType==="RESET"){
        
        await usersModel.findByIdAndUpdate(userId,{
          $set:{
          forgotPasswordToken:hashedToken,
        forgotPasswordTokenExpiry:Date.now() + 3600000
        }
        },{new:true})
      }

      const htmlForVerifyTokenEmail = `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
      or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`

      const htmlForForgetPasswordEmail = `<p>Click <a href="${process.env.DOMAIN}/forgetPassword?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
      or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/forgetPassword?token=${hashedToken}
      </p>`

      
      const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "717e4258e1447c",
          pass: "8a429893713ee9"
        }
      });
        
          const info = await transporter.sendMail({
            from: 'arbabmemon235@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType==="VERIFY" ? "Verify your email":"Reset your password", // Subject line
            html: emailType==="VERIFY"? htmlForVerifyTokenEmail : htmlForForgetPasswordEmail // html body
          });
        
          return info;

    } catch (error:any) {
        throw new Error('Error in sending email : ',error.message);
    }


  }