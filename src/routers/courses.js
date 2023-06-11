let { Router } = require("express");
const coursesControllers = require("../controllers/courses.controller");
let coursesRouter = Router();

coursesRouter.get("/courses", coursesControllers.get);
coursesRouter.post("/courses", coursesControllers.post);
coursesRouter.put("/courses/:id", coursesControllers.put);
coursesRouter.delete("/courses/:id", coursesControllers.delet);
coursesRouter.get("/courses/:id", coursesControllers.getOne);
module.exports = coursesRouter;
