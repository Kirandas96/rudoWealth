const mongoose = require("mongoose");

const cruiserSchema = mongoose.Schema({
    "name": {type:String,required: true},
    "location": {type:Number,required: true},
    "rides": {type:Number,required: true},
    "rating":{type:Number,required: true}
});

const cruiserModel = mongoose.model("cruisers", cruiserSchema);

module.exports = cruiserModel;