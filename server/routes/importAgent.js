
var express = require('express');
var request = require('request');
var router = express.Router();
const dialogflow = require('dialogflow');
const uuid = require('uuid');
var path = require('path');
global.appRoot = path.resolve(__dirname);
//filePath = path.join(__dirname, 'royalSecond.zip');
// lib/moduleA/component1.js
//console.log(filePath);
//require(appRoot + '/royalSecond.zip');

/* GET all user segment list. */



router.post('/', function (req, res, next) {
    try {
        let reqBody=req.body;
        if(!!reqBody.hasOwnProperty('clentSecret')&& reqBody.hasOwnProperty('agentUri')){
            let clentSecret=reqBody.clentSecret;
            const sessionId = uuid.v4();
            let privateKey = clentSecret.private_key;// "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDhnFjgqCoaHK1R\n+QAJ2d+RxN2HFf7FyvLYpV8YhbWNIgXxJBfjNcj//kKWvdRDkEaJeNgz/NyGFu2Y\nYlTujQZmqheb0uNfnDmPeDKgpdzmdU3Tqv2JO1cMlhg1G0oEFckDxhfqDnFyhXq3\ndfWqNFCMdu0h9HoEfp0Blt3L6sm2x5GLRyh7LMYjf+s9dRiqybdOEZVh+q8nbTb3\nfFZE9GrgG9ebq8zf/L1+M0DZg6KvBuZ3PfInNOQ3gGcEQcBygfxPopZbCsSlhkfo\noQE+JDyXrs0ZOxxX8ASCkku4aXkRKLOGUJhQGlhtDAaRSD6XyeoWFrwEmVm4a0LI\nl+l5nrBBAgMBAAECggEADXnDu0OAJEgjOBq53FzFpFTQcJGpQpIxOCyEhhfydKgc\nF7+yp5EeXOAIhS14gMKc2/g6XbyURXQYI/p3nToSME6nk1ig2SShMYcZ6wuNKrzF\n9ccoVqqTM/7BGmbzYFQWyiFqa0IKl68OWefzUQPH7ePqnRUXtq4DXcVvoQ74lnCv\nb+A3xgvafca/7u1GrfY5/9rgnR0SdO9LV95RNcv0qH4TIr6626qbY58nZdJoV0V4\nJLJbasUY3n/zW5m1nE0X+CfsrRvy6NCbHil5plSSM0XlNJds4UJqqpKUM9hM7ywG\nDigqYLLufeZQLX0wdpfE7Pecp8OLkhMnmfKfwLD4MwKBgQD5LpLOxI5sWms5q9GC\nkJhLRIdd15/XZ8axs5qrVRMRWmJxsEZt3DCf66voahnPLiXwEN/s4cEywfCI1VAK\n5CFwKmC+gjGvVzGpks25DkcMA3talsgkBtbB9RUkjEvYpGpW6Vf9VmSHSCCMDokm\n5PxUBhkBt0IGpOx9nhJQVLuNywKBgQDnyKqQTaWKwo7X2QowS4Jau/QQwpW6nQnf\n3QAKNtvb9jndJtGZD+5Qohcv0yAL9nn/xgtZqLE5OAjMQtIbtPsyG+mIx2Dp1PN5\nbu6ZEG0Hx+RI2hs9mADWtli1WjA2zxrRy1tBfL9R5BcxJbGoC7qenTcjmc+RwI5S\nx0xtZ604owKBgFH/T3QXHj7tqic6MSFj75mlHV52HDVIAwxq69TBlBq7wXVj6mkw\nchfN963tbDzPFNDg3K8Ywviu9TYx67sJwy8j4t4N/ceTS9ZfZq8k0aBUbP0sbQPd\n9EGzIpf6SuMph4y+EKRfD4ms5HjyN5PC+n2z2/rCkUmab/AOWjxxBZ7tAoGAJKd7\nMa7VywfRhxjvn4uRZb/rbOsYupYzBY/xfawHQNXDeNG2u7nlOiMn/4wnuTyVNnmf\nOeKPhDj0SzkV+QO55ca8O8Er9k6S4lVErjgGxgA6fbrgK/Fp0IqtpKBKl6BQ4XSD\nTevoZY7ojAEmAyk3rfW2zo54YNhOqZCS6YpHvnkCgYBpMe2u87OqkBEBQcxGclpj\nOm1aaWoKMsk6ELrW/geWm1/thgKd/qN4M0v3s4Wb+1ygq3fdHKXzsTX/jS3oD7yi\nsHmUCsOQBIKN3Lu4VFjIpYTFroQDkrkAnEhc9KgMeiErVmTMX1DhDws2XLQptA1p\n55aP5/lyTMgHVqqn7e+qwg==\n-----END PRIVATE KEY-----\n";// (process.env.NODE_ENV=="production") ? JSON.parse(process.env.DIALOGFLOW_PRIVATE_KEY) : process.env.DIALOGFLOW_PRIVATE_KEY
            let clientEmail = clentSecret.client_email; //"dialogflow-cehhiu@royal-enfield-support.iam.gserviceaccount.com"; //process.env.DIALOGFLOW_CLIENT_EMAIL
            let config = {
                credentials: {
                    private_key: privateKey,
                    client_email: clientEmail
                }
            }
            const sessionClientNew = new dialogflow.AgentsClient(config);
            //const sessionPath = sessionClientNew.sessionPath(clentSecret.project_id, sessionId);
            sessionClientNew.restoreAgent({parent:`projects/${clentSecret.project_id}`, agentUri:reqBody.agentUri }).then((data) => {
                res.send(data);
            })
        }
        else{
            res.send({"message":"clentSecret or agentUri missing "});
        }
        
       // console.log(path.dirname("royalSecond.zip"));
       
    } catch (error) {
        console.log(error);
    }
});
module.exports = router;


