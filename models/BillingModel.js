const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
    shopkeeperId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Shopkeeper"},
    customerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Customer"},
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product"},
        quantity: { type: Number },
        price: { type: Number}
    }],
    amount: { type: Number },
    discount: { type: Number },
    paymentType: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Bill", billSchema);
