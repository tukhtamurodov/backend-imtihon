let jwt = require("jsonwebtoken");
let { verify, JsonWebTokenError, TokenExpiredError } = jwt;

const verifyUser = (req, _, next) => {
  if (
    req.url === "/login" ||
    req.url === "/verify-token" ||
    req.method === "GET"
  ) {
    return next();
  }
  let token = req.headers["access-token"];
  if (!token) {
    next({ status: 400, message: "Token is not exsist" });
  }
  verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err instanceof TokenExpiredError) {
      next({ message: "Token expired", status: 401 });
    }
    if (err instanceof JsonWebTokenError) {
      next({ message: "Invalid token", status: 401 });
    }
    next();
  });
};

module.exports = verifyUser;
