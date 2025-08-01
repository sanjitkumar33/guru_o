import mongoose from "mongoose";

export const connection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "MERN_AUTHENTICATION"
    }).then(() =>{
        console.log("Connected to database.");
    }).catch(error=>{
        console.log(`some error while connection to the database: ${error}`);
    });
};