

// const {MultiBot} =require('../models/index');
const MultiBot = require('./../models/multi-bot');
const application = require('./../lib/applicationsList')
let redisClient = require('../config/redis');
let ObjectId = require('mongodb').ObjectID;
var constants = require("./../config/constants");
var environment = constants.SERVER_ENV
const createMutliBot = async (multiBot) => {
  let newBot = await MultiBot.create(multiBot);
  let app = new application("", multiBot.applicationId);
  app.addMultiToApplication(newBot);
  return newBot;
};
const updateMultiBot = async (bot) => {

  let updatedBot = await MultiBot.updateOne({ _id: ObjectId(bot._id) }, { $set: bot });
  let app = new application("", bot.applicationId);
  let appDetail = await  app.getAppDetail(bot.applicationId);
  appDetail=JSON.parse(JSON.stringify(appDetail))[0]||{};
  let integrations =appDetail.integration || {};
  for (const integration in integrations) {
    if (integrations.hasOwnProperty(integration)) {
      for (const addedIntegration in integrations[integration]) {
        if (integrations[integration].hasOwnProperty(addedIntegration)) {
          if (integrations[integration][addedIntegration].hasOwnProperty("selectedBot")) {
            if (integrations[integration][addedIntegration].selectedBot == bot._id) {
              bot["id"] = bot._id;
              bot["bot_id"] = bot._id;
              appDetail.integration[integration][addedIntegration].bot = bot;
            }
          }
        }
      }
    }
  }
  app.updateApplication({integration:appDetail.integration});

  redisClient.del(`${environment}:app_${bot.applicationId}`).then(data => {
    return updatedBot;
  })
};
const getMultiBots = async (applicationId) => {

  let bots = await MultiBot.find({
    applicationId: applicationId
  });

  return bots;
};


const getMultiBotDetail = async (multiBotId) => {
  let workflow = await MultiBot.findOne({
    _id: new ObjectId(multiBotId)
  });
  return workflow
}
module.exports = {
  createMutliBot,
  updateMultiBot,
  getMultiBots,
  getMultiBotDetail

};
