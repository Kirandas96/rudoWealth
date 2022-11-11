const { Router } = require("express");
const CruiserModel = require("../Model/CruiserModel");

const CruiserRouter = Router();

CruiserRouter.get("/users", async (req, res) => {
  const user = await CruiserModel.find();
  res.send(user);
});

CruiserRouter.post("/signup", async (req, res) => {
  const Cruiser = new CruiserModel(req.body);
  Cruiser.save((err, success) => {
    if (err) {
      res.status(500).send({ message: "Error occurred" });
    }
    return res
      .status(201)
      .send({ message: "Sign up success", data: Cruiser.name });
  });
});

module.exports = CruiserRouter;
