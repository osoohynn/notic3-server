const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.listen(3001, () => {
  console.log('http://localhost:3001');
});

app.get('/', (req, res) => {
    res.send('Hello World..');
});

const adminRouter = require('./admin');
app.use('/admin', adminRouter);

const boardRouter = require('./board');
app.use('/api/posts', boardRouter);