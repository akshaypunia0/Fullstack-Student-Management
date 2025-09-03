import express from "express";
import studentRoutes from "./routes/student.route.js";
import userRoutes from "./routes/user.routes.js";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(morgan("dev"))

app.use("/api/student", studentRoutes)    //studentRoutes == router in student.route.js
app.use("/api/user", userRoutes)


app.get("/", (req, res) => {
    res.send("Server is live 🚀");
    
})

export default app;