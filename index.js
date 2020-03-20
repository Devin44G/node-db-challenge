const express = require('express');

const server = express();
      server.use(express.json());

server.get('/', (req, res) => {
  res.send(`
    <h1>Project Tables Sprint</h1>
    <h3>Welcome to the server!</h3>
    `);
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`\n ** LISTENDING ON PORT ${PORT} ** \n`);
});
