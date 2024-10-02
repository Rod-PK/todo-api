import express from "express";
import mongoose from "mongoose";
import "dotenv/config"
import todoRouter from "./routes/todo.js";
import userRouter from "./routes/user.js";

// Connect to database
await mongoose.connect(process.env.MONGO_URI)

// Create an express app
const app = express();

// Use routes
// app.get("/hello", (req, res, next) => {
//     // console.log(req.headers);
//     res.json("You visited the hello endpoint!");
// });

// app.get("/goodbye", (req, res, next) => {
//     // console.log(req.query);
//     res.json("Same to you!");
// });

app.use(todoRouter, userRouter);
// app.use(userRouter);

// Listen for incoming requests
app.listen(3000, () => {
    console.log("App is listening on port 3000");
});