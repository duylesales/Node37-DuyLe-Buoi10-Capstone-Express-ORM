
import jwt from "jsonwebtoken";


const createToken = (data) => {
  let token = jwt.sign(
    { data },
    "CAPSTONE_EXPRESS",
    // { algorithm: "HS256" },
    { expiresIn: "5y" }
  );
  return token;
};

// check token is validation?
const checkToken = (token) => {
  return jwt.verify(token, "CAPSTONE_EXPRESS");
};

// decode token
const decodeToken = (token) => {
  return jwt.decode(token);
};

// khoá api và chặn ko cho người ngoài truy cập(bảo mật cấp 1)
const lockApi = (req, res, next) => {
  try {
    let { token } = req.headers;
    checkToken(token);
    next();
  } catch (exception) {
    res.status(401).send("No permission to get access!!");
  }
}

export { createToken, checkToken, decodeToken, lockApi };
