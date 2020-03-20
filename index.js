const express = require('express');
const projectRouter = require('./projects/projects-router.js');

const server = express();
      server.use(express.json());
      server.use('/api', projectRouter);

server.get('/', (req, res) => {
  res.send(`
    <h1>Project Tables Sprint</h1>
    <h3>Welcome to the server!</h3>
    `);
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`\n ** LISTENING ON PORT ${PORT} ** \n`);
});
