const express = require('express');
const Item = require('../models/item');
const router = new express.Router();

// Returns sample data
router.get('/sample', async (req, res) => {
  try {
    const data = await Item.findById(27874);
    res.set({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    res.type('json').send(JSON.stringify(data, null, 4));
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;