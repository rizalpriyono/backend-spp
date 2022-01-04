const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const md5 = require('md5');

const models = require('../models/index');
const siswa = models.siswa;
const auth = require('./auth');

const response = require('../utils/response');

app.get('/', auth, async (req, res) => {
  let result = await siswa.findAll({
    include: ['spp', 'kelas'],
  });
  res.status(200).json(response.data(true, result, 200, "Data Siswa"));
});

app.get('/:nisn', async (req, res) => {
  let param = { nisn: req.params.nisn };
  siswa
    .findOne({ where: param, include: ['spp', 'kelas'] })
    .then((result) => {
      res.status(200).json(response.data(true, result, 200, "One Data Siswa"));
    })
    .catch((error) => {
      res.status(400).json(response.data(true, null, 400, "Failed to get One data"));

    });
});

// app.post('/login', async (req, res) => {
//   let param = {
//     username: req.body.username,
//     password: md5(req.body.password),
//   };

//   let result = await siswa.findOne({ where: param });
//   if (result) {
//     res.json({
//       logged: true,
//       data: result,
//     });
//   } else {
//     res.json({
//       logged: false,
//       message: 'Invalid Username and Password',
//     });
//   }
// });

app.post('/', auth, async (req, res) => {
  let data = {
    nisn: req.body.nisn,
    nis: req.body.nis,
    nama: req.body.nama,
    id_kelas: req.body.id_kelas,
    email: req.body.email,
    alamat: req.body.alamat,
    no_telp: req.body.no_telp,
    password: md5(req.body.password),
    id_spp: req.body.id_spp,
  };
  siswa
    .create(data)
    .then((result) => {
      res.status(200).json(response.data(true, data, 200, "Successfully to add data"));
    })
    .catch((error) => {
      res.status(400).json(response.data(false, null, 400, "Failed to add data"));
    });
});

app.put('/', auth, async (req, res) => {
  let param = { nisn: req.body.nisn };
  let data = {
    // nis: req.body.nis,
    nama: req.body.nama,
    id_kelas: req.body.id_kelas,
    alamat: req.body.alamat,
    no_telp: req.body.no_telp,
    // email: req.body.email,
    password: md5(req.body.password),
    id_spp: req.body.id_spp,
  };
  siswa
    .update(data, { where: param })
    .then((result) => {
      res.status(200).json(response.data(true, null, 200, "Successfully to edit data"));
    })
    .catch((error) => {
      res.status(400).json(response.data(false, null, 400, "Failed to edit data"));
    });
});

app.delete('/:nisn', auth, async (req, res) => {
  let param = { nisn: req.params.nisn };
  siswa
    .destroy({ where: param })
    .then((result) => {
      res.status(200).json(response.data(true, null, 200, "Successfully to delete data"));
    })
    .catch((error) => {
      res.status(400).json(response.data(false, null, 400, "Failed to delete data"));
    });
});

module.exports = app;
