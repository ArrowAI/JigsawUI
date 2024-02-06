
const api = require('../models/api');

const createApi = async (Api) => {
  let newApi = await api.findOneAndUpdate({ name: Api.name }, Api, {upsert: true});
  return newApi;


};
const updateApi = async (Api) => {
  let updatedApi = await Api.update();
  return updatedApi;
};

const getApi = async () => {
  let Api = await api.find({});
  return Api;
};

const getApiDetail = async (name) => {
  let Api = await api.findOne({ name: name });
  return Api;
};
module.exports = {
  createApi,
  updateApi,
  getApi,
  getApiDetail
}
