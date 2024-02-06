const Groups = require("../models/groups");
const constants = require("../config/constants");
let ObjectId = require("mongodb").ObjectID;
let MongoClient = require("mongodb").MongoClient;
const createGroups = async (_group) => {
  let newGroups = await Groups.create(_group);
  return newGroups;
};
const updateGroups = async (_group) => {
  let updatedGroups = await Groups.findOneAndUpdate(
    { _id: _group._id },
    _group,
    { upsert: true }
  );
  return updatedGroups;
};

const getGroups = async (applicationId) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(constants.DB_CONNECTION_STRING_FULL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((client) => {
      // ...
      const db = client.db(constants.DATABASE_NAME);
      const Groups = db.collection("user_groups");
      Groups.find({ applicationId: applicationId }).toArray((err, Groups) => {
        resolve(Groups);
      });
    });
  });

  // let Groups = await Groups.find({});
  // return Groups;
};

const getGroupDetail = async (groupId) => {
  let Groups = await Groups.findOne({ _id: groupId });
  return Groups;
};
module.exports = {
  createGroups,
  updateGroups,
  getGroups,
  getGroupDetail,
};
