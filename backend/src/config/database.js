import mongoose  from "mongoose";
import { MOGODB_URI } from "./env.js";

if(!MOGODB_URI){
    throw new Error('Please define mongodb_uri env variable in .env.<production/development>.local');
}

const connectDatabase = async()=>{
    try {
        const conn = await mongoose.connect(MOGODB_URI);
        console.log(`Mongo Db connected: ${conn.connection.host}`);  
    } catch (error) {
        console.log('Error connecting to Database',error);
        process.exit(1);
    }
}

export default connectDatabase;