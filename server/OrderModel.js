const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});
const Counter = mongoose.model("Counter", CounterSchema, "counters");

// Skema untuk Pesanan
const orderSchema = new mongoose.Schema({
  customer_name: { type: String, required: true },
  address: { type: String, required: true },
  notes: { type: String },
  payment_proof_path: { type: String, required: true },
  order_id_num: { type: Number, unique: true }, // Angka unik (misal: 1)
  created_at: { type: Date, default: Date.now },
});
const Order = mongoose.model("Order", orderSchema, "orders");

/**
 * Fungsi untuk Mendapatkan ID Pesanan Angka Unik
 * @returns {Promise<number>} Angka ID Pesanan berikutnya
 */
async function getNextOrderIdNum() {
  const counter = await Counter.findOneAndUpdate(
    { _id: "orderId" }, // Dokumen counter yang spesifik
    { $inc: { seq: 1 } }, // Naikkan nilai 'seq'
    { new: true, upsert: true } // Buat jika belum ada, kembalikan dokumen baru
  );
  return counter.seq;
}

module.exports = {
  Order,
  getNextOrderIdNum,
};
