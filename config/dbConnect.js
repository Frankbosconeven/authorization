const { connect } = require('mongoose');

async function dbConnect() {
  try {
    await connect('mongodb://localhost:27017', {
      dbName: 'Shop',
    });
    console.log('Connected to MongoDB');

    
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = {
  dbConnect,
};
