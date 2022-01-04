const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const models = require('../models/index');
const spp = models.spp;
const auth = require('../api/auth');
app.use(auth);

const response = require('../utils/response')

app.get('/', async (req, res) => {
  let result = await spp.findAll();
  res.status(200).json(response.data(true, result, 200, "Data spp"));
});

app.post('/', async (req, res) => {
  let data = {
    angkatan: req.body.angkatan,
    tahun: req.body.tahun,
    nominal: req.body.nominal,
  };
  spp
    .create(data)
    .then((result) => {
      res.status(200).json(response.data(true, data, 200, "Successfully to add data"));
    })
    .catch((error) => {
       res.status(400).json(response.data(false, null, 400, "Failed to add data"));
    });
});

app.put('/', async (req, res) => {
  let param = { id_spp: req.body.id_spp };
  let data = {
    angkatan: req.body.angkatan,
    tahun: req.body.tahun,
    nominal: req.body.nominal,
  };
  spp
    .update(data, { where: param })
    .then((result) => {
      res.status(200).json(response.data(true, data, 200, "Successfully to edit data"));
    })
    .catch((error) => {
      res.status(400).json(response.data(false, null, 400, "Failed to edit data"));
    });
});

app.delete('/:id_spp', async (req, res) => {
  let param = { id_spp: req.params.id_spp };
  spp
    .destroy({ where: param })
    .then((result) => {
      res.status(200).json(response.data(true, null, 200, "Successfully to delete data"));
    })
    .catch((error) => {
      res.status(400).json(response.data(false, null, 400, "Failed to delete data"));
    });
});

module.exports = app;
