const express = require('express');
const morgan = require('morgan'); // log request
require('express-async-errors'); // handle async errors
const cors = require('cors'); // allow access from another web server

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/users', require('./routes/user.route'));

// Error Handlers
app.use(function (req, res, next) {
  res.status(404).send({
    error_message: 'Endpoint not found!',
  });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send({
    error_message: 'Something broke!',
  });
});

// Listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`The academy api is running at http://localhost:${PORT}`);
});
