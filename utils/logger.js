const logger = require('morgan');
const path = require('path');
const { createWriteStream } = require('fs');

module.exports = () => {
  const accessLogStream = createWriteStream(
    path.join(process.cwd(), 'logs', 'access.log'),
    { flags: 'a' },
  );

  return logger('combined', { stream: accessLogStream });
};
