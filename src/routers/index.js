let Router = require("express");
const adminRouter = require("./admins");
const categoriesRouter = require("./categories");
const verifyUser = require("../middlewares/verify");
const centersRouter = require("./centers");
const filialsRouter = require("./filials");
const coursesRouter = require("./courses");

let routers = Router();

routers.use(adminRouter);
routers.use(verifyUser, [categoriesRouter, centersRouter,filialsRouter,coursesRouter]);


module.exports = routers;
