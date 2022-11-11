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
    ,{$project:{boat:1,
        locationPoints: {$switch: {
        branches: [
           { case: { $lte:[ "$distance", 3 ]}, then: 5 },
           { case: {$and:[{ $gte: [ "$distance",0 ] },{ $lte: ["$distance",5 ] }]}, then: 3 },
           { case: { $gte: ["$distance", 6 ] }, then: 0 }
        ]
     }},
     ridingPoints:{$switch: {
        branches: [
           { case: {$and:[{ $gte: [ "$rides",3 ] },{ $lte: [user.rides,2 ] }]},then: 3 },
           { case: {$and:[{ $lt: [ "$rides",3 ] },{ $gt: [user.rides,2 ] }]},then: 3 },
           { case: { $lte:[ "$rides", 3 ]}, then: 1  }
        ]
     }},
     ratingPoints:{$cond: { if: { $gte: [ user.rating,"$rating"] }, then: 2, else: 0 }}}},
    {$project:{boat:1,totalPoints:{$add:['$locationPoints','$ridingPoints','$ratingPoints']}}}
    ,{$sort:{totalPoints:-1}}
])
    return res.send(data)
  } catch (error) {
    return res.send(error)
  }  
});

module.exports = BookRouter;
