const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

function logger(req, res, next) {
  const waktu = new Date().toISOString();
  console.log(`[${waktu}] ${req.method} ${req.url}`);
  next(); // wajib, agar request lanjut ke handler berikutnya
}

// Didaftarkan sebelum route agar mencatat seluruh request
app.use(logger);

app.use(express.json());

let mahasiswa = [
  { id: 1, nama: "Andi", jurusan: "Sistem Informasi" },
  { id: 2, nama: "Budi", jurusan: "Informatika" },
];
let nextId = 3;

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Server Express.js berjalan pada port " + PORT);
});

router.get("/mahasiswa", (req, res) => {
  const { jurusan } = req.query;

  if (jurusan) {
    const hasil = mahasiswa.filter((m) => m.jurusan === jurusan);
    return res.json(hasil);
  }

  res.json(mahasiswa);
});

router.post("/mahasiswa", (req, res) => {
  const { nama, jurusan } = req.body;

  if (!nama || !jurusan) {
    return res.status(400).json({ message: "nama dan jurusan wajib diisi" });
  }

  const baru = { id: nextId++, nama, jurusan };
  mahasiswa.push(baru);
  res.status(201).json(baru);
});

router.get("/mahasiswa/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const data = mahasiswa.find((m) => m.id === id);

  if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });
  res.json(data);
});

router.put("/mahasiswa/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = mahasiswa.findIndex((m) => m.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Data tidak ditemukan" });
  }

  mahasiswa[index] = { ...mahasiswa[index], ...req.body, id };
  res.json(mahasiswa[index]);
});

router.delete("/mahasiswa/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = mahasiswa.findIndex((m) => m.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Data tidak ditemukan" });
  }

  mahasiswa.splice(index, 1);
  res.status(204).send();
});

app.use("/", router);
app.use("/api", router);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

module.exports = app;
