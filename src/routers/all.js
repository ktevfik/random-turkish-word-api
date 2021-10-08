const express = require('express');
const Item = require('../models/item');
const router = new express.Router();

// Returns all data 90000+ words 92MB
router.get('/all', async (req, res) => {
  try {
    const data = await Item.find({});
    res.send(data);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;