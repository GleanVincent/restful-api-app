const Prodi = require("../models/prodiModel");
const { errorHttp } = require("../middlewares/errorHandler");

exports.create = async (req, res) => {
  try {
    const prodi = await Prodi.create(req.body);
    res.status(201).json(prodi);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  res.json(await Prodi.find());
};

exports.getById = async (req, res) => {
  const data = await Prodi.findById(req.params.id);
  if (!data) throw errorHttp(404, "Data prodi tidak ditemukan");
  res.json(data);
};

exports.update = async (req, res) => {
  const data = await Prodi.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!data) throw errorHttp(404, "Data prodi tidak ditemukan");
  res.json(data);
};

exports.remove = async (req, res) => {
  const data = await Prodi.findByIdAndDelete(req.params.id);
  if (!data) throw errorHttp(404, "Data prodi tidak ditemukan");
  res.status(204).send();
};
