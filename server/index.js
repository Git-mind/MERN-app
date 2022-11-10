import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/post.js";
import userRoutes from "./routes/user.js";

import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// cors() has to be ontop of routes
app.use(cors());

// Add prefix - every routes in posts.js will start with /posts
app.use("/posts", postRoutes);

app.use("/user", userRoutes);

//https://www.mongodb.com/cloud/atlas

// const CONNECTION_URL =
//     "mongodb+srv://user-123:user123@cluster0.ver59ms.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
    )
    .catch((error) => console.log(error.message));
