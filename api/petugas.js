const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const md5 = require('md5');

const auth = require('./auth');
const models = require('../models/index');
const petugas = models.petugas;

app.use(auth);

const response = require('../utils/response');

app.get('/', async (req, res) => {
  let result = await petugas.findAll();
  res.status(200).json(response.data(true, result, 200, "Data Petugas"));
});

app.post('/', async (req, res) => {
  let data = {
    username: req.body.username,
    password: md5(req.body.password),
    nama_petugas: req.body.nama_petugas,
    level: req.body.level,
  };
  petugas
    .create(data)
    .then((result) => {
      res.status(200).json(response.data(true, data, 200, "Successfully to add data"));
    })
    .catch((error) => {
      res.status(400).json(response.data(false, null, 400, "Failed to add data"));
    });
});

app.put('/', async (req, res) => {
  let param = { id_petugas: req.body.id_petugas };
  let data = {
    username: req.body.username,
    password: md5(req.body.password),
    nama_petugas: req.body.nama_petugas,
    level: req.body.level,
  };
  petugas
    .update(data, { where: param })
    .then((result) => {
      res.status(200).json(response.data(true, data, 200, "Successfully to edit data"));
    })
    .catch((error) => {
      res.status(400).json(response.data(false, null, 400, "Failed to edit data"));
    });
});

app.delete('/:id_petugas', async (req, res) => {
  let param = { id_petugas: req.params.id_petugas };
  petugas
    .destroy({ where: param })
    .then((result) => {
      res.status(200).json(response.data(true, null, 200, "Successfully to delete data"));
    })
    .catch((error) => {
      res.status(400).json(response.data(false, null, 400, "Failed to delete data"));
    });
});

module.exports = app;
