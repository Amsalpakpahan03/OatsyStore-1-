const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { Order, getNextOrderIdNum } = require("./OrderModel"); // Import Model

const router = express.Router();
const PORT = 3000; // Asumsi PORT akan dipass atau didefinisikan secara global

// --- Konfigurasi Multer (Penyimpanan File) ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Pastikan direktori 'uploads/' ada
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

/**
 * Fungsi Pembantu untuk format Order ID
 * @param {number} orderIdNum - Angka ID Pesanan
 * @returns {string} Format Order ID (misal: #ORDER-001)
 */
const formatOrderId = (orderIdNum) =>
  `#ORDER-${String(orderIdNum).padStart(3, "0")}`;

// --- POST: Submit Pesanan (User) ---
router.post("/submit-order", upload.single("bukti_bayar"), async (req, res) => {
  // AMBIL DATA DARI req.body
  // Di FE, field ini bernama 'catatan', di BE kita simpan sebagai 'notes'
  const { nama, alamat, catatan } = req.body;
  const pesan = catatan; // Mapping 'catatan' dari FE ke variabel 'pesan' di BE
  let file_path = null;
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Bukti bayar tidak ditemukan." });
    }
    file_path = req.file.filename;
    const order_id_num = await getNextOrderIdNum();
    const order_number = formatOrderId(order_id_num);
    const newOrder = new Order({
      customer_name: nama,
      address: alamat,
      notes: pesan, // Menggunakan variabel 'pesan' yang sudah di-map
      payment_proof_path: file_path,
      order_id_num: order_id_num,
    });

    await newOrder.save();
    //         res.status(200).json({
    //             success: true,
    //             order_id: order_number,
    //             message: 'Pesanan berhasil disimpan dan file diupload.'
    //         });
    res.status(200).json({
      success: true,
      order_id: order_number,
      message: "Pesanan berhasil disimpan dan file diupload.",

      // --- TAMBAH DATA PESANAN YANG DIPERLUKAN FE ---
      customer_name: newOrder.customer_name,
      address: newOrder.address,
      notes: newOrder.notes,
      // ---------------------------------------------
    });
  } catch (error) {
    console.error("Error saat memproses pesanan:", error.message); // Hapus file yang sudah terupload jika ada kesalahan penyimpanan DB
    if (req.file && file_path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Gagal menghapus file setelah DB error:", err);
      });
    }
    res
      .status(500)
      .json({ success: false, message: "Terjadi kesalahan server internal." });
  }
});

// --- GET: Ambil Daftar Pesanan (Admin) ---
router.get("/admin/orders", async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ order_id_num: -1 })
      .select(
        "order_id_num customer_name created_at payment_proof_path address notes"
      );

    const formattedOrders = orders.map((order) => {
      const order_id = formatOrderId(order.order_id_num); // Menggunakan PORT yang sama untuk membuat URL akses file
      const proof_url = `http://localhost:${PORT}/uploads/${order.payment_proof_path}`;
      return {
        order_id, // ES6 Shorthand
        customer_name: order.customer_name,
        created_at: order.created_at,
        address: order.address,
        notes: order.notes,
        payment_proof_url: proof_url,
        raw_file_name: order.payment_proof_path,
      };
    });

    res.status(200).json({
      success: true,
      total_orders: formattedOrders.length,
      orders: formattedOrders,
    });
  } catch (error) {
    console.error("Error saat mengambil pesanan admin:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Gagal memuat data pesanan." });
  }
});

module.exports = router;
