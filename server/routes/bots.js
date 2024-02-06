var express = require("express");
var router = express.Router();
let applicationAuth = require("../lib/applicationAuth");
let applicationsList = require("../lib/applicationsList");
let bots = require("../lib/bots");
const verifyToken = require("./../middleware/verifyToken");
const { trainKnowledgeBaseBot } = require("./../controllers/kbController");

router.post("/", verifyToken, function (req, res, next) {
  let sessionid = false,
    key = false;
  appId = false;

  if (req.body.hasOwnProperty("appId")) {
    appId = req.body.appId;
  } else {
    res.json({ code: 1, error: "appId missing" });
  }
  // applicationAuth.tasks.authenticateArrowCredentials(key).then(function(user) {
  // if (!!user && user.hasOwnProperty("user_id")) {
  let applications = new applicationsList(req.body.userId, appId);
  // applications.verifyAndGetAppDetailForUser().then(function(appDetail) {
  // if (!!appDetail && appDetail != null) {
  let bot = new bots(req.body.userId, appId, "");
  // let bots = new bots();
  bot.getListOfBotForApp().then(
    function (bots) {
      // bots.map(bot=>bot.owned=true);
      res.json({
        code: 0,
        status: "success",
        data: bots.map((data) => {
          data.id = data._id;
          return data;
        }),
      });
      // })
      // }
    },
    function (err) {
      console.log(err);
      res.json({ code: 1, error: "Wrong Key" });
    }
  );
  //     } else {
  //         res.json({ code: 1, error: "Wrong Key" });
  //     }

  // })
});
router.get("/:botId", verifyToken, (req, res) => {
  let key = "",
    botId = req.params.botId;
  if (req.headers.hasOwnProperty("key")) {
    key = req.headers.key;
  } else {
    res.json({ code: 1, error: "wrong credential" });
  }
  // applicationAuth.tasks.authenticateArrowCredentials(key).then(function(user) {
  //     if (!!user && user.hasOwnProperty("user_id")) {
  let bot = new bots("", req.body.userId, botId);
  try {
    bot.getBotDetail().then((botDefinition) => {
      // console.log(JSON.stringify(botDefinition));

      res.send(botDefinition || {});
    });
  } catch (error) {
    console.log(error);
  }

  //     } else {
  //         res.json({ code: 1, error: "Wrong Key" });
  //     }
  // })
});
router.put("/:botId", verifyToken, (req, res) => {
  try {
    let key = "",
      botId = req.params.botId;
    if (req.headers.hasOwnProperty("key")) {
      key = req.headers.key;
    } else {
      res.json({ code: 1, error: "wrong credential" });
    }
    // applicationAuth.tasks.authenticateArrowCredentials(key).then(function(user) {
    //     if (!!user && user.hasOwnProperty("user_id")) {
    let bot = new bots("", req.body.userId, botId);
    try {
      bot.updateBotDetail(req.body).then((botDetail) => {
        res.send(botDetail);
      });
    } catch (error) {
      console.log(error);
    }

    //     } else {
    //         res.json({ code: 1, error: "Wrong Key" });
    //     }
    // })
  } catch (error) {
    console.log(error);
  }
});
router.post("/addModule", verifyToken, function (req, res, next) {
  let sessionid = false,
    key = false;
  appId = false;
  if (req.headers.hasOwnProperty("key")) {
    key = req.headers.key;
  } else {
    res.json({ code: 1, error: "wrong credential" });
  }
  if (req.body.hasOwnProperty("appId")) {
    appId = req.body.appId;
  } else {
    res.json({ code: 1, error: "appId missing" });
  }
  // applicationAuth.tasks.authenticateArrowCredentials(key).then(function(user) {
  //     if (!!user && user.hasOwnProperty("user_id")) {
  let applications = new applicationsList(req.body.userId, appId);
  // applications.verifyAndGetAppDetailForUser().then(function(appDetail) {
  // if (!!appDetail && appDetail != null) {
  let bot = new bots(req.body.userId, appId, "");
  // let bots = new bots();
  bot.crateNewBot(req.body, req.body.userId, appId).then(function (bot) {
    // bots.map(bot=>bot.owned=true);
    res.json(bot);
  });
  // }
  // }, function(err) {
  //     console.log(err);
  //     res.json({ code: 1, error: "Wrong Key" });
  // });
  //     } else {
  //         res.json({ code: 1, error: "Wrong Key" });
  //     }

  // })
});

/* Get All Public Bot List  */

router.post("/allpublicbots", function (req, res, next) {
  let bots = new bots("", "");
  bots.getAllPublicBots().then((bots) => {
    if (bots) {
      res.send(bots);
    } else {
      res.send("failed to fetch");
    }
  });
});
/*  Get  getFeaturedPublicBots */
router.post("/featuredpublicbots", function (req, res, next) {
  let bots = new bots("", "");
  bots.getFeaturedPublicBots().then((bots) => {
    if (bots) {
      res.send(bots);
    } else {
      res.send("failed to fetch");
    }
  });
});
/*  List Bot for user */
router.post("/listbotforuser", verifyToken, function (req, res, next) {
  console.log("listbotforuser");
  let sessionid = false,
    key = false;
  appId = false;
  if (req.body.hasOwnProperty("sessionid")) {
    sessionid = req.body.sessionid;
  } else {
    res.json({ code: 1, error: "wrong credential" });
  }
  if (req.body.hasOwnProperty("key")) {
    key = req.body.key;
  } else {
    res.json({ code: 1, error: "wrong credential" });
  }
  if (req.body.hasOwnProperty("appId")) {
    appId = req.body.appId;
  } else {
    res.json({ code: 1, error: "appId missing" });
  }
  // applicationAuth.tasks.authenticateArrowCredentials(key).then(function(user) {
  //     console.log("user=", user)
  //     if (!!user && user.hasOwnProperty("user_id")) {
  //         console.log("inuser")
  let bots = new bots(req.body.userId, appId);

  bots.getListOfBotForUser().then((bots) => {
    if (bots) {
      res.send(bots);
    } else {
      res.send("failed to fetch");
    }
  });
  // } else {
  //     res.send("Wrong Key")
  // }

  // })
});
router.get("/trainKbBot/:botId", verifyToken, (req, res) => {
  let key = "",
    botId = req.params.botId;
  if (req.headers.hasOwnProperty("key")) {
    key = req.headers.key;
  } else {
    res.json({ code: 1, error: "wrong credential" });
  }
  // applicationAuth.tasks.authenticateArrowCredentials(key).then(function(user) {
  //     if (!!user && user.hasOwnProperty("user_id")) {
  let bot = new bots("", req.body.userId, botId);
  try {
    bot.getBotDetail().then((botDefinition) => {
      if (
        botDefinition.hasOwnProperty("detail") &&
        botDefinition.detail.hasOwnProperty("knowledgebase")
      ) {
        let kb = botDefinition.detail.knowledgebase;
        for (key in kb) {
          if (kb.hasOwnProperty(key)) {
            trainKnowledgeBaseBot(kb[key].faqs, key);
          }
        }
      }

      // console.log(JSON.stringify(botDefinition));

      res.send(botDefinition || {});
    });
  } catch (error) {
    console.log(error);
  }

  //     } else {
  //         res.json({ code: 1, error: "Wrong Key" });
  //     }
  // })
});

module.exports = router;
