exports.addOrder = async (req, res) => {
    try {
        console.log("=== DEBUG ORDER ===");
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        const { nama, alamat, catatan } = req.body;

        if (!nama || !alamat) {
            return res.status(400).json({
                success: false,
                message: "Nama dan alamat wajib diisi."
            });
        }

        // simpan bukti bayar
        let buktiUrl = null;

        if (req.file) {
            const fs = require("fs");
            const filePath = `uploads/${Date.now()}_${req.file.originalname}`;
            fs.writeFileSync(filePath, req.file.buffer);
            buktiUrl = filePath;
        }

        const orderData = {
            nama,
            alamat,
            catatan,
            bukti: buktiUrl,
            createdAt: new Date()
        };

        console.log("ORDER TERSIMPAN:", orderData);

        return res.json({
            success: true,
            message: "Order berhasil diterima.",
            order: orderData
        });

    } catch (err) {
        console.error("Error submit order:", err);
        return res.status(500).json({
            success: false,
            message: "Gagal submit order."
        });
    }
};
