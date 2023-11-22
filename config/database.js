const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const debug = require('debug')('blog-api:database');

module.exports = async () => {
  let connectionString;

  try {
    process.chdir(process.cwd());
    connectionString = fs.readFileSync(
      path.join(process.env.DB_URI_FILE),
      'utf8',
    );
  } catch (error) {
    console.error(error);
  }

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
