const JWT = require("jsonwebtoken");
require("dotenv").config();

//genarate token and return it
module.exports = {
  signToken: (user) => {
    //dont use passowrd and other sensitive data to validate
    if (!user) return null;
    const token = {
      userId: user.userId,
      email: user.email,
      username: user.username,
    };
    return JWT.sign(token, process.env.JWT_SECRET, {
      expiresIn: "45m",
    });
  },

  authenticate: async (req, res, next) => {
    try {
      const token = req.headers["x-access-token"];
      if (!token) return res.json(false);
      const verified = JWT.verify(token, process.env.JWT_SECRET);
      if (!verified) return res.status(500).json(false);
      return res.status(200).json(true);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
};
