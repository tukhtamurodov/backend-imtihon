const query = require("../lib/queryPg");
const { pg } = require("../lib/pg");
const jwt = require("jsonwebtoken");


let verifyToken = async (req, res, next) => {
  let token = req.headers["access-token"];
  if (!token) {
    return next({ status: 401, message: "no token provided" });
  }
  let decoded = jwt.verify(token, process.env.SECRET_KEY);
  console.log(decoded);
  if (!decoded) {
    return next({ status: 401, message: "invalid token" });
  }
  let admin = await pg(query.admin.get, decoded.id);

  if (!admin.length > 0) {
    return next({ status: 401, message: "invalid token" });
  }
  res.json({ message: "success", admin: admin[0] });
};

let login = async (req, res, next) => {
  let { password, username } = req.body;
  let response = await pg(query.admin.login, password, username);
  if (!response.length > 0) {
    return next({ status: 401, message: "wrong password or username" });
  }
  let token = jwt.sign({ id: response[0].admin_id }, process.env.SECRET_KEY);
  return res.json({ status: 200, message: "succes", token });
};

let controllersAdmin = { verifyToken, login };

module.exports = controllersAdmin;
