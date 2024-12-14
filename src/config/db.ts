import mongoose from "mongoose";
import colors from 'colors';

export const connectDB = async () => {
    try {
        
        const {connection} = await mongoose.connect(process.env.MONGO_URI );
        const url=`${connection.host}:${connection.port}/${connection.name}`;
        console.log("Database connected successfully in: ",url);
    } catch (error) {
        console.log(colors.bgRed.white.bold(`Error connecting to database ${error.message}`));
        process.exit(1);
    }
    }