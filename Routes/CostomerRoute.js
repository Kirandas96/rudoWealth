const { Router } = require("express");
const costomerModel = require("../Model/CostomerModel");

const CostomerRouter = Router();

CostomerRouter.get("/users", async (req, res) => {
  const user = await costomerModel.find();
  res.send(user);
});

CostomerRouter.post("/signup", async (req, res) => {
  const costomer = new costomerModel(req.body);
  costomer.save((err, success) => {
    if (err) {
      res.status(500).send({ message: "Error occurred" });
    }
    return res
      .status(201)
      .send({ message: "Sign up success", data: costomer.name });
  });
});

module.exports = CostomerRouter;
