const Elementservice = require('./../services/elementService');

const getElements = async function (req, res) {
  try {
    const Elements = await Elementservice.getElements();
    return res.sendSuccessResponse(Elements);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};


const createElements = async function (req, res) {
  try {
    const newElements = await Elementservice.createElements(req.body);
    return res.sendSuccessResponse(newElements);
  } catch (error) {
    console.error(error);
    return res.sendSuccessResponse({error:error.message});
  }
};
const updateElements = async function (req, res) {
  try {
    const updatedElements = await Elementservice.updateElements(req.body);
    return res.sendSuccessResponse(updatedElements);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};

const getElementDetail= async function (req, res) {
  try {
    const { name } = req.params;
    const element = await Elementservice.getElementDetail(name);
    return res.sendSuccessResponse(element);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};


module.exports = {
  getElements,
  updateElements,
  createElements,
  getElementDetail

};
