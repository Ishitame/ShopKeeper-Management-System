const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const shopkeeperModel = require("../models/shopkeeperModel");


exports.signup = async (req, res) => {
  
    const { name, email, password, phone, location,shopname } = req.body;

    
    const existing = await shopkeeperModel.findOne({ email });
    if (existing) return  res.send("user already  registered ");
    
    const user = new shopkeeperModel({ name, email, password, phone, location,shopname  });
    await user.save();

    res.send("Shopkeeper registered successfully");
  } 


  exports.login = async (req, res) => {
   
      const { email, password } = req.body;
  
      const user = await shopkeeperModel.findOne({ email });
      if (!user) return   res.send( "Invalid email or password" );
  
      const check = await bcrypt.compare(password, user.password);
      if (!check) return   res.send( "Invalid email or password" );
  
      const token = jwt.sign(
        { id: user._id, email:user.email}, 
        process.env.JWT_SECRET, 
        { expiresIn: "7d" }
      );
  
      
      res.cookie("token", token);
  
      res.send("Shopkeeper logged in successfully");
  };

  exports.getProfile = async (req, res) => {
    
      const user = await shopkeeperModel.findById(req.user.id);
      if (!user) return res.send( "User not found" );
  
      res.json({ success: true, user });

  };

  exports.logout = (req, res) => {
    res.cookie("token", "");
    res.send("You have logged out" );
  };