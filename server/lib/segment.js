const request = require('request');
const { resolve, reject } = require('q');

let segment={
    getSegmentUserById: (segmentId)=>{
        return new Promise((resolve,reject)=>{
            try {
                request({
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    uri: `https://event.arrowai.in/segment/${segmentId}`,
                    method: 'GET'
                }, function(err, res, body) {
                      if(err){
                          console.log(err);
                          reject(new Error('error in gettion segment user'))
                      }
                      else{
                          resolve(typeof body==='string'?JSON.parse(body):body)
                      }
                })
            } catch (error) {
                console.log(error)
                reject(new Error('error in gettion segment user'))
            }
        })
    }
}

module.exports = segment;