const cors = require('cors');
const express = require('express');
const middleware = require('./middleware');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/services', require('./routes/index'));

app.use(middleware.error, middleware.alone);

app.listen('3011', () => {
  console.log('Aplicação rodando na porta 3011');
});
