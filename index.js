const mongoose = require('mongoose');
const util = require('util');
const debug = require('debug')('node-server:index');

// config should be imported before importing any other file
const config = require('./src/config');
const server = require('./src/server');

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;


mongoose.connect('mongodb://165.232.138.112:27017/itjugadudb', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  promiseLibrary: Promise,
}, (err, res) => {
  if (err) {
    console.log('Error while connecting database', err);
  } else {
    console.log('connected with database', res);
  }
});

/*
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
MongoClient.connect('mongodb://139.59.40.172:27017/itjugadudb', function (err, db) {
    if (err) {
        throw err;
    } else {
        console.log("successfully connected to the database");
    }
    db.close();
});

*/
/*
mongoose.connect('mongodb://localhost:27017/itjugadudb', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  promiseLibrary: Promise,
});
mongoose.connection.on('error', () => {
  throw new Error('unable to connect to database: '); // ${mongoUri}
});

*/
// print mongoose logs in dev env
if (config.mongooseDebug) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}


// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  // listen on port config.port
  server.listen(config.port, () => {
    console.log(`server started on port ${config.port} (${config.env})`);
    debug(`server started on port ${config.port} (${config.env})`);
  });
}

module.exports = server;
