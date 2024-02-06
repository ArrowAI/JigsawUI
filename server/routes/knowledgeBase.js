const express = require("express");
const KnowledgeBaseRouterRouter = express.Router();

const KnowledgeBaseController = require("../controllers/kbController");

const responseFormatter = require("../middleware/responseFormatter");
KnowledgeBaseRouterRouter.use(responseFormatter);
KnowledgeBaseRouterRouter.route("/").post(KnowledgeBaseController.createKnowledgeBase); //TODO: TO REMOVE
// KnowledgeBaseRouterRouter.route("/:knowledgeBaseId").patch(KnowledgeBaseController.updateKnowledgeBase); 
KnowledgeBaseRouterRouter.route("/list").post(KnowledgeBaseController.getKnowledgeBases);
KnowledgeBaseRouterRouter.route("/:knowledgeBaseId").get(KnowledgeBaseController.getKnowledgeBaseDetail); 
KnowledgeBaseRouterRouter.route("/trainKb/:knowledgeBaseId").get(KnowledgeBaseController.trainKnowledgeBase); 

module.exports = KnowledgeBaseRouterRouter;


// router.post("/trainQna", function(req, res) {
//     let qnaList = req.body.qnaList;
//     applicationId = req.body.applicationId;
//     // console.log(JSON.stringify(qnaList));
//     var stream = fs.createWriteStream("qna.tsv");
//     stream.once('open', function(fd) {
//         let str = "";
//         qnaList.forEach(qna => {
//             qna.questions.forEach(ques => {
//                 str = str + `${ques.replace(/(\r\n|\n|\r)/gm, "")}	${qna.metadata[0].value} ${qna.metadata[1].value} ${qna.answer.replace(/(\r\n|\n|\r)/gm, "")} \n`
//             })
//         })
//         stream.write(str);
//         stream.end();
//         qnaHelper.trainQna(applicationId);

//     });
//     res.send({ success: true })
// })