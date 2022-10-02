const express = require('express');
const {
  addRec,
  getRec,
  updateRec,
  deleteRec,
} = require('../api/personal.controller');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to record system API !');
});

router.get('/getRecord', async (req, res) => {
  const data = await getRec();
  res.send(data);
});

router.post('/addRecord', (req, res) => {
  addRec(req.body)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => console.log(err));
});

router.put('/updateRecord', async (req, res) => {
  const data = await updateRec(req.body);
  res.send(data);
});

router.delete('/deleteRecord', async (req, res) => {
  const data = await deleteRec(req.body.id);
  res.send(data);
});

module.exports = router;
