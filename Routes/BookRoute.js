const { Router } = require("express");
const BookRouter = Router();
const costomerModel = require("../Model/CostomerModel");
const CruiserModel = require("../Model/CruiserModel");


BookRouter.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId
    const user=await costomerModel.findById(userId)
    const data=await CruiserModel.aggregate([
    {$group:{_id:null,boat:{$push:"$$ROOT"}}},
    {$unwind:'$boat'},
    {$project:{boat:1,distance:{$abs:{$subtract:[user.location,'$boat.location']}},rating:{$abs:{$subtract:[user.rating,'$boat.rating']}},rides:{$abs:{$subtract:[user.rides,'$boat.rides']}}}}
    ,{$project:{boat:1,locationPoints: {$switch: {
        branches: [
           { case: { $lte:[ "$distance", 3 ]}, then: 5 },
        //    { case: { $eq: ["$distance",4] }, then: 3 },
           { case: {$and:[{ $gte: [ "distance",0 ] },{ $lte: ["distance",5 ] }]}, then: 3 },
           { case: { $gte: ["distance", 6 ] }, then: 0 }
        ]
     }},ridingPoints:{$cond: { if: { $lte: [ "$rides", 3 ] }, then: 5, else: 3 }},ratingPoints:{$cond: { if: { $lte: [ "$rating", 3 ] }, then: 5, else: 3 }}}},
    {$project:{boat:1,totalPoints:{$add:['$locationPoints','$ridingPoints','$ratingPoints']}}}
    ,{$sort:{totalPoints:-1}}
])
    return res.send(data)
  } catch (error) {
    return res.send(error)
  }  
});

module.exports = BookRouter;
