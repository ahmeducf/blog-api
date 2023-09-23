const cors = require('cors');

const whitelist = [
  'http://localhost:3000',
  'http://localhost:5000',
  'https://myFrontend.com',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = cors(corsOptions);
