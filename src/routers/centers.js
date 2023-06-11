let { Router } = require("express");
const centersControllers = require("../controllers/centers.controller");
let centersRouter = Router();

centersRouter.get("/centers", centersControllers.get);
centersRouter.post("/centers", centersControllers.post);
centersRouter.put("/centers/:id", centersControllers.put);
centersRouter.delete("/centers/:id", centersControllers.delet);
centersRouter.get("/centers/:id", centersControllers.getOne);
module.exports = centersRouter;
