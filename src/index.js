const express = require('express');
const app = express();
const rateLimit = require('express-rate-limit');
const port = process.env.PORT;
require('./db/mongoose');
const path = require('path');
const allRouter = require('./routers/all');
const wordsRouter = require('./routers/words');
const sampleRouter = require('./routers/sample');
const publicFolder = path.join(__dirname, 'public');

app.use(express.json());

// just get methods
app.use((req, res, next) => {
  if (req.method !== 'GET') {
    res.status(403).json({
      statusCode: 403,
      header: 'Unauthorized',
      error: 'ONLY GET REQUESTS ARE ENABLED',
    });
  } else {
    next();
  }
});
const apiRequestLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  handler: function(req, res) {
    return res.status(429).json({
      error: 'You sent too many requests. Please wait a while then try again',
    });
  },
});

app.use(apiRequestLimiter);
app.use(allRouter);
app.use(wordsRouter);
app.use(sampleRouter);
app.get('/', function(req, res) {
  res.sendFile(path.join(publicFolder, 'index.html'));
});

app.use('/', express.static(publicFolder));
app.listen(port, () => {
  console.log('Server is up on port http://localhost:' + port);
});
