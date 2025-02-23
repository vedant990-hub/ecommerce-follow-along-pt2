const app = require("./app");
const connectDB = require("./db/Database");

process.on("uncaughtException", (err) =>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server for handling uncaught exception`)
})

if (process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path: "./config/.env",
    });
};

connectDB();

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on https://localhost:${process.env.PORT}`)
})

// xWLcUv2KbLhI62oK