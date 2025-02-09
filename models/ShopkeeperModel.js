const mongoose = require("mongoose");
const bcrypt=require('bcrypt')
const shopkeeperSchema = new mongoose.Schema({
    name: { type: String},
    email: { type: String},
    password: { type: String},
    phone: { type: String },
    shopname: { type: String},
    location: { type: String},
},{timestamps:true});


shopkeeperSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });



module.exports = mongoose.model("Shopkeeper", shopkeeperSchema);
