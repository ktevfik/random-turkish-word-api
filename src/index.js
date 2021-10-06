const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

require('./db/mongoose');

const Item = require('./models/item')

const validator = require('validator')


app.use(express.json());

// just get methods
app.use((req,res,next) => {
  if(req.method !== 'GET') {
    res.status(403).json({
      statusCode: 403,
      header: 'Unauthorized',
      error: 'ONLY GET REQUESTS ARE ENABLED',
    })
  } else {
    next()
  }
})

// Get 1 one number as default
// Get /words?number={number}
app.get("/words",async (req,res) => {
    let def = 1
    if(req.query.number !== undefined) {
        if(validator.default.isNumeric(req.query.number)) {
            def = parseInt(req.query.number)
        }
    }


    try {
        const data = await Item.aggregate([{$sample:{size:def}}])

        res.set({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        });


        res.send(data)
    } catch (e) {
        res.status(500).send(e)
    }
})
// Returns all data 90000+ words 23MB
app.get('/all', async (req,res) => {
    try {
        const data = await Item.find({})
        res.send(data)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.listen(port, () => {
  console.log('Server is up on port http://localhost:' + port);
});