const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

async function initDatabase() {
  let mongoServer;
  let mongoUri;

  try {
    mongoServer = await MongoMemoryServer.create();
    mongoUri = mongoServer.getUri();
  } catch (error) {
    console.error(error);
  }

  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on('error', (e) => {
    if (e.message.code === 'ETIMEDOUT') {
      mongoose.connect(mongoUri);
    }
    console.error(e);
  });

  mongoose.connection.once('open', () => {
    console.log(`MongoDB successfully connected to ${mongoUri}`);
  });

  return mongoServer;
}

async function closeDatabase(mongoServer) {
  await mongoose.disconnect();
  await mongoServer.stop();
  console.log('MongoDB successfully disconnected');
}

module.exports = {
  initDatabase,
  closeDatabase,
};
