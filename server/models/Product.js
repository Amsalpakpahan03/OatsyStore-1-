const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        price: { type: Number, required: true },
        desc: { type: String, required: true },
        image: { type: String, default: null }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
