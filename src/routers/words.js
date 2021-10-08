const express = require('express');
const validator = require('validator');
const Item = require('../models/item');
const router = new express.Router();

// Get 1 one number as default
// Get /words?number={number}
router.get('/words', async (req, res) => {
  let def = 1;
  if (req.query.number !== undefined) {
    if (validator.default.isNumeric(req.query.number)) {
      def = parseInt(req.query.number);
    }
  }
  try {
    const data = await Item.aggregate([{$sample: {size: def}}]);
    res.set({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    res.send(data);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;

