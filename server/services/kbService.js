const ObjectId = require("mongodb").ObjectID;
const redis = require("./../config/redis");
const { mongoPoolPromise } = require("./../connections/mongoUtils");

const saveKnowledgeBase = (_kb) => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await mongoPoolPromise();
      const kb = db.collection("knowledgeBases");
      if (_kb._id)
        kb.updateOne(
          { _id: ObjectId(_kb._id) },
          { $set: { faqs: _kb.faqs || [] } }
        ).then((knowledgeBases) => {
          console.log(`Successfully ${knowledgeBases}updated  documents.`);
          resolve(knowledgeBases);
        });
      else
        kb.insertOne(_kb, function (err, newKb) {
          resolve(newKb.ops[0]);
        });
    } catch (error) {
      console.log(err);
    }
  });
};
const getKnowledgeBases = (applicationId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await mongoPoolPromise();
      const kb = db.collection("knowledgeBases");
      kb.find({ applicationId: applicationId })
        .toArray()
        .then((knowledgeBases) => {
          console.log(`Successfully found ${knowledgeBases.length} documents.`);
          resolve(knowledgeBases);
        });
    } catch (error) {
      console.log(error);
    }
  });
};
const getKnowledgeBaseDetail = (kbId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await mongoPoolPromise();
      const kb = db.collection("knowledgeBases");
      kb.findOne({ _id: ObjectId(kbId) }).then((knowledgeBases) => {
        console.log(`Successfully ${knowledgeBases}found  documents.`);
        resolve(JSON.parse(JSON.stringify(knowledgeBases)));
      });
    } catch (error) {
      console.log(err);
    }
  });
};
const saveTrainedKbToRedis = async (kbId, trainedModel) => {
 let res= await redis.setBykey(`knowledgebaseBot_${kbId}`, trainedModel);
 return res;
};
module.exports = {
  saveKnowledgeBase,
  getKnowledgeBases,
  getKnowledgeBaseDetail,
  saveTrainedKbToRedis,
};
