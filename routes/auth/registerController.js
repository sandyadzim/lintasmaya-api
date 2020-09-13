const bcrypt = require("bcrypt");

const models = require("../../models");
const User = models.user;

var express = require("express");
var router = express.Router();

/* GET home page. */
router.post("/", async function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  try {
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashPassword);
    User.findOne({ where: { email } }).then(async (user) => {
      if (user) {
        res.status(409).json({
          success: "false",
          message: "Email telah terdaftar.",
        });
      } else {
        const createUser = await User.create({
          name: name,
          email: email,
          password: hashPassword,
        });
        if (createUser) {
          res.status(201).json({
            success: "true",
            data: createUser,
            message: "Email Berhasil Didaftarkan",
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: "false",
      error: "Server Error",
      message: error,
    });
  }
});

module.exports = router;
