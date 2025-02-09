const express= require('express')
const dotenv = require("dotenv");
const cookieParser=require("cookie-parser")
dotenv.config();
const connectDB = require('./config/mongoConfig');
const authRoutes= require('./routes/frontPage');



connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser()); 

app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));