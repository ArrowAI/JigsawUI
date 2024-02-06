let mongoose = require("./../config/mongooseDB");
let Schema = mongoose.Schema;
let environment = process.env.NODE_ENV;
let mongoosePaginate = require('mongoose-paginate');

var UsersSchema = new Schema({
  id: String,
  key: [String]
}, { strict: false, collection: "users" },
  {
    groups: [{
      gorupId: Schema.ObjectId,
      ref: 'Groups'
    }]
  },
  {
    timestamps: true
  }, { timestamps: true });
UsersSchema.plugin(mongoosePaginate);
let users = mongoose.model("users", UsersSchema);


module.exports = users;