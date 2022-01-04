const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const spp = require('./api/spp');
const petugas = require('./api/petugas');
const login = require('./api/login');
const kelas = require('./api/kelas');
const siswa = require('./api/siswa');

app.use('/api/spp', spp);
app.use('/api/petugas', petugas);
app.use('/api/login', login);
app.use('/api/kelas', kelas);
app.use('/api/siswa', siswa)

app.listen(5000, () => {
  console.log('Server run on port 5000');
});