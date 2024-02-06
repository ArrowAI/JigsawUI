let constants = require('./../config/constants');
let ObjectId = require('mongodb').ObjectID;
let MongoClient = require('mongodb').MongoClient;
const getPackageByType = async (type) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(constants.DB_CONNECTION_STRING_FULL, { useNewUrlParser: true,useUnifiedTopology: true })
            .then(client => {
                try {
                    const db = client.db(constants.DATABASE_NAME)
                const Package = db.collection('modulePackages');
                Package.findOne({ "type": type }).then(async (packages) => {
                    const Elements = db.collection('elements');
                    if(packages!=null && packages.modules)
                    Elements.find({ "_id": { "$in": packages.modules } }).toArray((err, elements) => {
                        var orderedResults = packages.modules.map(function (id) {
                            return elements.find(function (document) {
                                return document._id.equals(id);
                            });
                        });
                        resolve(orderedResults);
                    })
                    else{
                        resolve([])
                    }
                }) 
                } catch (error) {
                    // resolve([])
                }
               
            })
    })
}

module.exports = {
    getPackageByType
}