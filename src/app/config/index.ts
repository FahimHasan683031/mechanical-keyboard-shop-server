import dotenv from "dotenv";
dotenv.config();

export default {
    port: process.env.PORT,
    bd_url: process.env.DB_URL
};