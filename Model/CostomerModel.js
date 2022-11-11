const mongoose = require("mongoose");

const costomerSchema = mongoose.Schema({
    "name": {type:String,required: true},
    "location": {type:Number,required: true},
    "rides": {type:Number,required: true},
    "rating":{type:Number,required: true}
});

const costomerModel = mongoose.model("costomers", costomerSchema);

module.exports = costomerModel;  