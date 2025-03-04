import dotenv from "dotenv"
import {connectDB} from "./models/index.js";
import {app} from './app.js'
import { createServer } from 'http';
dotenv.config({
    path: './.env'
})

// socket server
const server = createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: true,
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   },
// });



connectDB()
.then(async () => {
    server.listen( process.env.PORT || 8080, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!!!!!! ", err);
})
