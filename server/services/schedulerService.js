

// const {Scheduler,NodeTypes,CredentialTypes,Credentials} =require('../models/index');
const Scheduler = require('../models/scheduler');

let ObjectId = require('mongodb').ObjectID;
const createScheduler = async (scheduler) => {
  let newScheduler = await Scheduler.create(scheduler);
  return newScheduler;
};
const updateScheduler = async (scheduler) => {
  let updatedScheduler = await Scheduler.update({ id: scheduler.id }, {
    $set: {
      connections: scheduler.connections,
      nodes: scheduler.nodes,
      settings: scheduler.settings,
      active: scheduler.active,
      name: scheduler.name,

    }
  });
  return updatedScheduler;
};
const getSchedulers = async (applicationId) => {
  console.log(applicationId);
  let scheduler = await Scheduler.find({
    applicationId: applicationId

  });

  return scheduler;
};


const getSchedulerDetail = async (schedulerId) => {
  let scheduler = await Scheduler.findOne({
    id: schedulerId
  });
  return scheduler
}
const deleteScheduler = async (SchedulerId) => {
  let scheduler = await scheduler.findOne({
    id: schedulerId
  });
  return Scheduler
}
module.exports = {
  createScheduler,
  updateScheduler,
  getSchedulers,
  getSchedulerDetail,
  deleteScheduler
};
