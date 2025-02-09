const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const shopkeeperModel = require("../models/shopkeeperModel");
require('dotenv').config();
const secretKey = process.env.JWT_SECRET;

exports.authMiddleware = async (req, res, next) => {
    
        const token = req.cookies.token;
        if (!token) {
            return res.send("Not logged in");
        }

        jwt.verify(token, secretKey, async (err, decoded) => {
            if (err) {
                return res.send("Invalid Token");
            }

            const { id ,email} = decoded;
            const user = await shopkeeperModel.findById(id);

            if (!user) {
                return res.send("Log In");
            }

            req.user = user;
            next();
        });
    
};
