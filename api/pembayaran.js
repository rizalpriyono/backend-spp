const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const dateformat = require('dateformat');
const auth = require('../auth');

const models = require('../models/index');
const pembayaran = models.pembayaran;

const response = require('../utils/response');

app.get('/', auth, async (req, res) => {
  let result = await pembayaran.findAll({ include: ['tagihan', 'siswa'] });
  res.status(200).json(response.data(true, result, 200, "Data Pembayaran"));
});

app.get('/:nisn', async (req, res) => {
  let param = { nisn: req.params.nisn };
  pembayaran
    .findAll({ where: param, include: ['tagihan'] })
    .then((result) => {
      res.status(200).json(response.data(true, result, 200, "One Data Pembayaran"));
    })
    .catch((error) => {
      res.status(400).json(response.data(false, null, 400, "Failed to get one data"));
    });
});

app.post('/', async (req, res) => {
  let data = {
    id_petugas: req.body.id_petugas,
    nisn: req.body.nisn,
    tgl_bayar: dateformat(new Date(), 'yyyy-mm-dd'),
    bulan_spp: req.body.bulan_bayar,
    tahun_spp: req.body.tahun_bayar,
  };
  pembayaran
    .create(data)
    .then((result) => {
      res.status(200).json(response.data(true, null, 200, "Successfully to add data"));
    })
    .catch((error) => {
      res.status(400).json(response.data(false, null, 400, "Failed to add data"));
    });
});

app.put('/', auth, async (req, res) => {
    let data = {
      id_petugas: req.body.id_petugas,
      nisn: req.body.nisn,
      tgl_bayar: dateformat(new Date(), 'yyyy-mm-dd'),
      bulan_spp: req.body.bulan_bayar,
      tahun_spp: req.body.tahun_bayar,
    };
    pembayaran
      .update(data, { where: param })
      .then((result) => {
        res.status(200).json(response.data(true, null, 200, "Successfully to edit data"));
      })
      .catch((error) => {
      res.status(400).json(response.data(false, null, 400, "Failed to edit data"));
      });
});

app.delete('/:id_pembayaran', auth, async (req, res) => {
  let param = { id_pembayaran: req.params.id_pembayaran };
  pembayaran
    .destroy({ where: param })
    .then((result) => {
      res.status(200).json(response.data(true, null, 200, "Successfully to delete data"));
    })
    .catch((error) => {
      res.status(400).json(response.data(false, null, 400, "Failed to delete data"));
    });
});

module.exports = app;