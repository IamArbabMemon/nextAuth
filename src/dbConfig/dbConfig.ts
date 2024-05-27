import mongoose from "mongoose";

export async function connect(){
    try{

        if (mongoose.connection.readyState >= 1) {
            // If already connected, reuse the connection
            return;
          }
        

        mongoose.connect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/firstNext');
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log("Database has been connected successfully");
        });

        connection.on('error',(err)=>{
            console.log("Error in database : ",err);
            process.exit(1);
        });

    }catch(err){
        console.log("Some Error has been occured in database");
        console.log(err);
    }
};

