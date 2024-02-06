const Agents = require("./../models/users");
const Application = require("./../models/application");
let request = require("request");
const constants = require("../config/constants");
const { CLOUD_STORAGE_URL } = constants;
let ObjectId = require("mongodb").ObjectID;
let MongoClient = require("mongodb").MongoClient;
 const redisClient = require("./../config/redis");
const { async, resolve } = require("q");
const createAgents = async (agent, applicationId) => {
 let key = `app_${applicationId}_config`;
  redisClient.del(key);
  delete agent.id;
  agent.isAgent=true;
  let agentInStore= await addAgentInStore(agent);
  if(agentInStore.regUserId){
    agent.id=agentInStore.regUserId.id;
    const user = new Agents(agent);

    let newAgent = await user.save();
    // let newAgents = await Agents.create(agent);
    await Application.findOneAndUpdate(
      { _id: applicationId },
      {
        $addToSet: {
          users: {
            user_id: newAgent.id,
            created_at: Date.now(),
            role: "owner",
          },
        },
      }
    );

    return newAgent;
  }
  else{
    return {error:agentInStore}
  }

 
};
const addAgentInStore = async (_agent) => {
  //call api with post
  return new Promise((resolve,reject)=>{
    request({
      headers: {
        "Content-Type": "application/json",
      },
      url: `${CLOUD_STORAGE_URL}/app_usermanager_adduser`,
      method: "POST",
      json: _agent,
    }, function (err, res, body) {
         resolve(body)
  })
  })


};
const updateAgents = async (_agent) => {
  let updatedAgents = await Agents.findOneAndUpdate(
    { _id: _agent._id },
    _agent,
    { upsert: true }
  );
  return updatedAgents;
};

const getAgents = async (applicationId) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(constants.DB_CONNECTION_STRING_FULL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(async (client) => {
      // ...
      const db = client.db(constants.DATABASE_NAME);
      const Application = db.collection("application");
      let applicationDetail = await Application.findOne({
        _id: ObjectId(applicationId),
      });
      // console.log(applicationDetail)
      let users = applicationDetail.users.map((user) => {
        return user.user_id;
      });
      console.log(users);
      Agents.find({ id: { $in: users } }).then((data) => {
        resolve(data);
      });
    });
  });
};

const getAgentDetail = async (agentId) => {
  let Agents = await Agents.findOne({ _id: agentId });
  return Agents;
};
module.exports = {
  createAgents,
  updateAgents,
  getAgents,
  getAgentDetail,
};
