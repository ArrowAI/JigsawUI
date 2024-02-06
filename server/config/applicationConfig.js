var nodeEnv = process.env.NODE_ENV || 'production';
var obj = {};
if (nodeEnv === 'rcb') {
    obj = {
        "58906f07faad6f52008b456a": {
        "confidence" : "90",
            "exitStrategy" : {
            "counter" : 4,
                "laterCounter" : 7,
                "noRive" : true,
                "status" : true,
                "story" : {
                "a" : {
                    "initial" : {
                        "a" : "Hey I am bit busy, since am practising up for the up-coming match, will catch you later."
                    },
                    "later" : {
                        "a" : "I am still in the practising area. Will get back to you once I am free. If you need something super important, just say “HI”"
                    }
                }
            }
        },
        "stopOnUnclear" : {
            "counter" : 3,
                "endCounter" : 4,
                "noRive" : true,
                "sentences" : [ "I am sorry that I am not able to understand you" ],
                "status" : true,
                "suggestions" : [ null, {
                "button_text" : "Latest News",
                "conversation" : "58ad9ca8d829ec52008b4567",
                "text" : "Why don't you watch the latest News"
            } ],
                "text" : "I am sorry that I am not able to understand you"
        },
        "suggestionOnUnclear" : {
            "counter" : 1,
                "defaultTags" : {
                "main_menu" : true
            },
            "endCounter" : 3,
                "sentences" : {
                "a" : "Why don't you have a look on",
                    "b" : "I recommend you should view one of the following"
            },
            "status" : true,
                "text" : "Why don't you have a look on"
        },
        "takeover" : {
            "manual" : false,
                "state" : false,
                "timeout" : 1
        },
        "unclearMaxCount" : 10000000
    }
    };
}

module.exports = obj;