const jwt = require("jsonwebtoken");

const AuthenticateToken = async (req, res, next) => {
  // console.log("Start AuthenticateToken");
  // console.log(req.headers);
  let jwtToken;
  try {
    const authHeader = req.headers["authorization"];
    if (authHeader === undefined) {
      return res
        .status(401)
        .json({ status: "failure", message: "Invalid User Header" });
    }

    if (authHeader !== undefined) {
      jwtToken = authHeader.split(" ")[1];
    }
    if (jwtToken === undefined) {
      return res
        .status(401)
        .json({ status: "failure", message: "Invalid Access Token" });
    } else {
        jwt.verify(jwtToken, process.env.JWT_SECRET, async (error, payload)=> {
            if(error){
                return res.status(401).json({status: "failure", message: "Invalid User Access Token"});
            }
            else{
                req.username = payload.username;
                req.user_id = payload.user_id;
                next();
            }
        });
    }

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = AuthenticateToken;
