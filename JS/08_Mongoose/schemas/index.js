const mongoose = require('mongoose');
module.exports = () => {
  const connect = () => {
    mongoose.connect('mongodb://localhost:15000/node', {}, (err) => { console.log(err || "Connected MongoDB"); });
  }
  connect();
  mongoose.connection.on('error', (err) => { console.log(err); });
  mongoose.connection.on('disconnected', () => { console.log('Retry to connect MongoDB'); connect(); });

  require('./user');
//  require('./comment');
}
