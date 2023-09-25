const mongoose = require('mongoose');

(async () => {
  try {
    const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@127.0.0.1:27017`;
    await mongoose.connect(uri);
    console.log(`conncted database`);
  } catch (error) {
    console.error(error);
  }
})();
