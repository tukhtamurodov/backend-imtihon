let express = require("express");
const errorsHandling = require("./errorHandler/error");
const routers = require("./routers");
const fileUpload = require("express-fileupload");
require("dotenv/config");
let app = express();
const PORT = process.env.PORT || 3456;
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routers);
app.use(errorsHandling);

app.listen(PORT, () => console.log(PORT));
