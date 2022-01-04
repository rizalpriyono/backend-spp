const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const models = require('../models/index');
const kelas = models.kelas;
const auth = require('../api/auth');
app.use(auth);

const response = require('../utils/response');

app.get('/', async (req, res) => {
  let result = await kelas.findAll();
  res.status(200).json(response.data(true, result, 200, "Data kelas"));
});

app.post('/', async (req, res) => {
  let data = {
    nama_kelas: req.body.nama_kelas,
    jurusan: req.body.jurusan,
    angkatan: req.body.angkatan
  };
  kelas
    .create(data)
    .then((result) => {
      res.status(200).json(response.data(true, data, 200, "Successfully to add data"));
    })
    .catch((error) => {
       res.status(400).json(response.data(false, null, 400, "Failed to add data"));
    });
});

app.put('/', async (req, res) => {
  let param = { id_kelas: req.body.id_kelas };
  let data = {
    nama_kelas: req.body.nama_kelas,
    jurusan: req.body.jurusan,
    angkatan: req.body.angkatan
  };
  kelas
    .update(data, { where: param })
    .then((result) => {
      res.status(200).json(response.data(true, data, 200, "Successfully to edit data"));
    })
    .catch((error) => {
       res.status(400).json(response.data(false, null, 400, "Failed to edit data"));
    });
});

app.delete('/:id_kelas', async (req, res) => {
  let param = { id_kelas: req.params.id_kelas };
  kelas
    .destroy({ where: param })
    .then((result) => {
      res.status(200).json(response.data(true, null, 200, "Successfully to delete data"));
    })
    .catch((error) => {
      res.status(400).json(response.data(false, null, 400, "Failed to delete data"));
    });
});

module.exports = app;
