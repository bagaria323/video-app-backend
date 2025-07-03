import { DB_NAME } from "../constants.js";
import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()


 const dbcall = async () => { 
    try {
         console.log("Attempting to connect to MongoDB...");
        const connectioninstance = await mongoose.connect(process.env.MONGODB_URI) 
        console.log(`\n ✅ SUCCESS: MongoDB connected! DB HOST: ${process.env.MONGODB_URI}`);

console.log(`connection host : ${connectioninstance.connection.host}`);
    } catch (error) {
         console.log(`FAILED to connect to MongoDB due to mongo error ` , error ); 
         process.exit(1) ;
    }
 }



 export default dbcall  