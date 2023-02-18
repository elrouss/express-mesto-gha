// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');

const { PORT = 3000 } = process.env;

const app = express();

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});