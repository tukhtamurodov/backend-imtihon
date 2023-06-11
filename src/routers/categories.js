let { Router } = require("express");
const controllersAdmin = require("../controllers/admins.controller");
const categoriesControllers = require("../controllers/categories.controller");

let categoriesRouter = Router();

categoriesRouter.get("/categories", categoriesControllers.get);
categoriesRouter.post("/categories", categoriesControllers.post);
categoriesRouter.put("/categories/:id", categoriesControllers.put);
categoriesRouter.delete("/categories/:id", categoriesControllers.delet);
categoriesRouter.get("/categories/:id", categoriesControllers.getOne);
module.exports = categoriesRouter;
