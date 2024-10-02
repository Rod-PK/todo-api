import express from "express";
import todoRouter from "./routes/todo.js";

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

app.use(todoRouter);

// Listen for incoming requests
app.listen(3000, () => {
    console.log("App is listening on port 3000");
});