const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const models = require("../../models");
const User = models.user;

var express = require("express");
var router = express.Router();

/* GET home page. */
router.post("/", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ where: { email } }).then((user) => {
    if (user) {
      console.log(user.name);
      const checkPassword = bcrypt.compare(password, user.password);
      if (checkPassword) {
        const token =
          "Bearer " + jwt.sign({ userId: user.id }, "my-secret-key");
        res.status(200).json({
          success: "true",
          data: {
            token: token,
            name: user.name,
            email: user.email,
          },
          message: "Login Sukses!",
        });
      } else {
        res.status(401).json({
          success: "false",
          message: "Password Salah",
        });
      }
    } else {
      res.status(404).json({
        success: "false",
        message: "User tidak ditemukan!",
      });
    }
  });
});

module.exports = router;
