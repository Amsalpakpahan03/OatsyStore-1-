const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  try {
    const data = await Product.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      products: data,
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil produk",
    });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { name, price, desc } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: "Nama dan harga wajib diisi",
      });
    }

    // Cek file
    const imagePath = req.file
      ? `/uploads/${req.file.filename}`
      : null;

    const product = new Product({
      name,
      price,
      desc: desc || "",
      image: imagePath,
    });

    await product.save();

    res.json({
      success: true,
      message: "Produk berhasil ditambahkan!",
      product,
    });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({
      success: false,
      message: "Gagal menambah produk",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const result = await Product.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan",
      });
    }

    res.json({
      success: true,
      message: "Produk berhasil dihapus",
    });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({
      success: false,
      message: "Gagal menghapus produk",
    });
  }
};
