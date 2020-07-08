const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { signToken } = require("../helpers/auth");

module.exports = {
  Signup: async (req, res) => {
    const emailExists = await User.findOne({ email: req.body.email });

    if (emailExists)
      return res.status(403).json({ message: "email already exists" });

    const Users = new User(req.body);
    
    try {
      const savedUser = await Users.save();
      const token = signToken(savedUser);
      console.log(savedUser);
      res
        .status(200)
        .json({ message: "sign up successfull >>><<<", Token: token });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  },
  Login: async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
      const user = await User.findOne({ email: email });

      const result = await bcrypt.compareSync(password, user.password);
      if (result === true) {
        //generating the cookies
        const sessUser = {
          id: user.id,
          name: user.username,
          email: user.email,
        };
        req.session.user = sessUser;
        const token = signToken(result);
        res.status(200).json({
          message: "successfully logged in >>>",
          Token: token,
          Cookie: sessUser,
        });
      } else {
        res.status(403).json({ message: "wrong password try again" });
      }
    } catch (error) {
      res
        .status(400)
        .json({ message: "failed to login please create an account" });
    }
  },
  Logout: (req, res) => {
    req.session.destroy((err) => {
      //deletes session data from storage
      if (err) throw err;
      res.clearCookie("session-id");
      res.send("Logged out successfully");
    });
  },
 Users: async(req,res,next)=>{
const user = await User.findById(req.user)
res.json(user)
 },
  Authchecker: (req,res)=>{
    const sessUser = req.session.user;
    try {
      if(sessUser) {
        return res.json({msg:"Authenticated successfully"})
      }
    } catch (error) {
      res.status(401).json({msg:"Unauthorized"})
    }
  }
};
