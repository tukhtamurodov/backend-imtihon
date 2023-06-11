let { Router } = require("express");
const filialsControllers = require("../controllers/filials.controller");
let filialsRouter = Router();

filialsRouter.get("/filials", filialsControllers.get);
filialsRouter.post("/filials", filialsControllers.post);
filialsRouter.put("/filials/:id", filialsControllers.put);
filialsRouter.delete("/filials/:id", filialsControllers.delet);
filialsRouter.get("/filials/:id", filialsControllers.getOne);
module.exports = filialsRouter;
