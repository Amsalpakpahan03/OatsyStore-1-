const mongoose = require("mongoose");
const MONGO_URI =
  "mongodb+srv://672022100_db_user:fQgewTy0UEdtWOip@warungdeso.wzekl4h.mongodb.net/oatsy_store_db?appName=warungdeso";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Terhubung ke MongoDB Atlas!");
  } catch (err) {
    console.error("Gagal terhubung ke MongoDB:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
