import { config } from "dotenv";

config({path: `.env.${process.env.NODE_ENV || 'development'}.local`});

export const { PORT,NODE_ENV,MOGODB_URI} = process.env;