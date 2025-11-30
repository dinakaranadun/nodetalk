import { config } from "dotenv";

config({path: `.env.${process.env.NODE_ENV || 'development'}.local`});

export const { PORT,NODE_ENV,MOGODB_URI,JWT_SECRET,JWT_EXPIRES_IN,JWT_REFRESH_SECRET,JWT_REFRESH_EXPIRES_IN} = process.env;