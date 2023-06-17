let express = require("express");
let cors = require("cors");
const path = require("path");
const errorsHandling = require("./errorHandler/error");

const routers = require("./routers");
const fileUpload = require("express-fileupload");
require("dotenv/config");

let app = express();
const PORT = process.env.PORT || 3456;


app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads", "logos")));

app.use(routers);
app.use(errorsHandling);

app.listen(PORT, () => console.log(PORT));
