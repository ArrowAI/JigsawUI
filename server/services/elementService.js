
const Elements = require('../models/elements');
const constants = require('./../config/constants');
let ObjectId = require('mongodb').ObjectID;
let MongoClient = require('mongodb').MongoClient;
const createElements = async (elements) => {
  let newElements = await Elements.findOneAndUpdate({ name: elements.name }, elements, { upsert: true });
  return newElements;


};
const updateElements = async (elements) => {
  let updatedElements = await Elements.update();
  return updatedElements;
};

const getElements = async () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(constants.DB_CONNECTION_STRING_FULL, { useNewUrlParser: true , useUnifiedTopology: true })
      .then(client => {
        // ...
        const db = client.db(constants.DATABASE_NAME)
        const Elements = db.collection('elements');
        Elements.find({}).toArray((err, elements) => {
          resolve(elements);
        })
      })

  })

  // let elements = await Elements.find({});
  // return elements;
};

const getElementDetail = async (name) => {
  let elements = await Elements.findOne({ name: name });
  return elements;
};
module.exports = {
  createElements,
  updateElements,
  getElements,
  getElementDetail
}
