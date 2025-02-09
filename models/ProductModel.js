const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    shopkeeperId: { type: mongoose.Schema.Types.ObjectId, ref: "Shopkeeper" },
    name: { type: String},
    brand: { type: String },
    costPrice: { type: Number }, 
    sellingPrice: { type: Number}, 
    stock: { type: Number, required: true, default: 0 }, 
    totalInvestment: { type: Number, default: 0 }, 
    discount: { type: Number, default: 0 }
    
}, { timestamps: true });

productSchema.methods.purchaseStock = async function (quantity, costPricePerUnit) {
    this.stock += quantity;
    this.totalInvestment += quantity * costPricePerUnit; 
    await this.save();
};

module.exports = mongoose.model("Product", productSchema);
