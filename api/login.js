const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const md5 = require('md5');
const jwt = require('jsonwebtoken');

const models = require('../models/index');
const petugas = models.petugas;
const siswa = models.siswa;
const SECRET_KEY = 'adminspp';

const response = require('../utils/response');

app.post('/', async (req, res) => {
  let paramPetugas = {
    username: req.body.username || req.body.email,
    password: md5(req.body.password),
  };
  let resultPetugas = await petugas.findOne({ where: paramPetugas });
  if (resultPetugas) {
    let payload = JSON.stringify(resultPetugas);
    // generate token
    let token = jwt.sign(payload, SECRET_KEY);
    let data = {
      akun: resultPetugas,
      role: resultPetugas.level,
      token: token
    }
    res.status(200).json(response.data(true, data, 200, "Login Success"));
  } else {
    let paramSiswa = {
      email: req.body.username || req.body.email,
      password: md5(req.body.password)
    }
    let resultSiswa = await siswa.findOne({ where: paramSiswa })
    if (resultSiswa) {
      let payload = JSON.stringify(resultSiswa);
      // generate token
      let token = jwt.sign(payload, SECRET_KEY);
      let data = {
        akun: resultSiswa,
        role: 'siswa',
        token: token
      }
      res.status(200).json(response.data(true, data, 200, "Login Success"));
    } else {
      res.status(400).json(response.data(false, null, 400, "Invalid username or password"));
    }
  }
});

module.exports = app;