const knowledgeBaseService = require("../services/kbService");
var fs = require("fs");
const { dockStart } = require("@nlpjs/basic");

const getKnowledgeBases = async function (req, res) {
  try {
    let applicationId = req.body.applicationId;
    const knowledgeBases = await knowledgeBaseService.getKnowledgeBases(
      applicationId
    );
    return res.sendSuccessResponse(knowledgeBases);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};

const createKnowledgeBase = async function (req, res) {
  try {
    const newKb = await knowledgeBaseService.saveKnowledgeBase(req.body);
    return res.sendSuccessResponse(newKb);
  } catch (error) {
    console.error(error);
    return res.sendSuccessResponse({ error: error.message });
  }
};
// const updateKnowledgeBase = async function (req, res) {
//   try {
//     const updatedknowledgeBases = await knowledgeBaseService.updateKnowledgeBase(req.body);
//     return res.sendSuccessResponse(updatedknowledgeBases);
//   } catch (error) {
//     console.error(error);
//     return res.sendErrorResponse();
//   }
// };

const getKnowledgeBaseDetail = async function (req, res) {
  try {
    const { knowledgeBaseId } = req.params;
    console.log(knowledgeBaseId);
    const knowledgeBase = await knowledgeBaseService.getKnowledgeBaseDetail(
      knowledgeBaseId
    );
    return res.sendSuccessResponse(knowledgeBase);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};

const trainKnowledgeBase = async function (req, res) {
  try {
    const { knowledgeBaseId } = req.params;
    const knowledgeBase = await knowledgeBaseService.getKnowledgeBaseDetail(
      knowledgeBaseId
    );
    let faqs = knowledgeBase.faqs || [];
    let trainedKb = await trainKnowledgeBaseBot(faqs, knowledgeBaseId);
    return res.sendSuccessResponse(trainedKb);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};
const trainQna = async (fileName) => {
  return new Promise((resolve, reject) => {
    //wait for five seconds
    setTimeout(async () => {
      const dock = await dockStart({ use: ["Basic", "Qna"] });
      const nlp = dock.get("nlp");
      await nlp.addCorpus({
        filename: fileName,
        importer: "qna",
        locale: "en",
      });
      await nlp.train();
      let data = nlp.export();
      try {
        fs.unlinkSync(fileName);
      } catch (err) {
        console.error(err);
      }
      resolve(JSON.parse(data));
    }, 5000);
  });
};
const trainKnowledgeBaseBot = async function (faqs, knowledgeBaseId) {
  try {
    let qnaList = [];
    faqs.forEach((faq, parentIndex) => {
      faq.data.forEach((data, index) => {
        let qna = {
          id: parentIndex,
          answer: data.answer,
          source: "Kb",
          questions: data.questions.map((question) => question.name),
          metadata: [
            {
              name: "faq_id",
              value: index,
            },
            {
              name: "category_id",
              value: faq.id,
            },
          ],
        };
        qnaList.push(qna);
      });
    });
    let fileName = new Date().getTime() + ".tsv";
    var stream = fs.createWriteStream(fileName);
    stream.once("open", async function (fd) {
      let str = "";
      qnaList.forEach((qna) => {
        qna.questions.forEach((ques) => {
          str =
            str +
            `${ques.replace(/(\r\n|\n|\r)/gm, "")}	${qna.metadata[0].value} ${
              qna.metadata[1].value
            } ${qna.answer.replace(/(\r\n|\n|\r)/gm, "")} \n`;
        });
      });
      stream.write(str);
      stream.end();
    });
    let trainedKb = await trainQna(fileName);
    await knowledgeBaseService.saveTrainedKbToRedis(knowledgeBaseId, trainedKb);
    // qnaHelper.trainQna(applicationId);
    return trainedKb;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getKnowledgeBases,
  createKnowledgeBase,
  getKnowledgeBaseDetail,
  trainKnowledgeBase,
  trainKnowledgeBaseBot,
};
