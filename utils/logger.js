const logger = require('morgan');
const path = require('path');
const fs = require('fs');

module.exports = () => {
  if (!fs.existsSync(path.join(process.cwd(), 'logs'))) {
    fs.mkdirSync(path.join(process.cwd(), 'logs'));
  }

  const accessLogStream = fs.createWriteStream(
    path.join(process.cwd(), 'logs', 'access.log'),
    { flags: 'a' },
  );

  return logger('combined', { stream: accessLogStream });
};
