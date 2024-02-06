const { MongoClient } = require("mongodb");
const constants = require("./../config/constants");

const uri = constants.DB_CONNECTION_STRING_FULL;
let connPoolPromise = null;
const mongoPoolPromise = () => {
  if (connPoolPromise) return connPoolPromise;
  connPoolPromise = new Promise(async (resolve, reject) => {
    const conn = await new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    conn
      .connect()
      .then(() => {
        return resolve(conn.db(constants.MONGO_DB_NAME));
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
  return connPoolPromise;
};

module.exports = {
  mongoPoolPromise,
};
