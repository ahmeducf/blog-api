const mongoose = require('mongoose');
const debug = require('debug')('blog-api:database');

module.exports = async () => {
  const connectionString = process.env.DB_URI_PROD || process.env.DB_URI_DEV;
  
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    debug('Database connected');
  } catch (error) {
    console.error(error);
  }
};
