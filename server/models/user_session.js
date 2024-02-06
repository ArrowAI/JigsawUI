let mongoose = require("./../config/consmoDB");
let Schema = mongoose.Schema;

let mongoosePaginate = require('mongoose-paginate');

let UserSession = new Schema(
    {
        _id:  {type: String, index: true}
    },
    { strict: false });

// UserSession.pre('save', function(next) {
//     this._id = this._id.toString();
//     next();
// });
UserSession.plugin(mongoosePaginate);
let userSession = mongoose.model("sessions", UserSession);


module.exports = userSession;
