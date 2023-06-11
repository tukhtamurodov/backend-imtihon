let { Router } = require("express");
const controllersAdmin = require("../controllers/admins.controller");

let adminRouter = Router();

adminRouter.get("/verify-token", controllersAdmin.verifyToken);
adminRouter.post("/login", controllersAdmin.login);

module.exports = adminRouter;
