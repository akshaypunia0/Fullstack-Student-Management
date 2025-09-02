import { port } from "./src/config/env.js";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

connectDB();

app.listen(port, () => {

    console.log("listenning to server success");
    
})