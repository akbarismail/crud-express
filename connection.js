const mongoose = require('mongoose');

(async () => {
  try {
    const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@127.0.0.1:27017/${process.env.DB_NAME}?authSource=admin`;
    await mongoose.connect(uri);
    console.log(`connected database`);
  } catch (error) {
    console.error(error);
  }
})();

// const { MongoClient } = require('mongodb');
// const client = new MongoClient(url);

// (async () => {
//   try {
//     await client.connect();
//     console.log('connected database');
//   } catch (error) {
//     console.error(error);
//   }
// })();

// module.exports = client;
