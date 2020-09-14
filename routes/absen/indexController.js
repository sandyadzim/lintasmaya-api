const models = require("../../models");
const { validationResult, check } = require("express-validator");

var express = require("express");
var router = express.Router();

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const absen = await models.absen.findAll({
      where: {
        user_id: id,
      },
      include: [
        {
          model: models.user,
          as: "users",
          attributes: ["name", "email"],
        },
      ],
    });
    if (absen.length > 0) {
      res.status(200).json({
        success: "true",
        data: absen,
      });
    } else {
      res.status(404).json({
        success: "false",
        message: "Not Found",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: "false",
      error: "Server Error",
      message: err.message,
    });
  }
});

router.post(
  "/",
  [check("user_id").exists().withMessage("require")],
  async (req, res) => {
    const error = validationResult(req);
    if (error.isEmpty()) {
      const { latitude, longitude, user_id } = req.body;
      try {
        const checkAbsen = await models.absen.findAll({
          where: {
            user_id: user_id,
          },
          order: [["createdAt", "DESC"]],
          limit: 1,
        });
        if (checkAbsen.length > 0) {
          const lastUpdate = new Date(checkAbsen[0].createdAt);
          const today = new Date();

          const m = today.getMonth() + 1;
          const d = today.getDate();
          const y = today.getFullYear();

          const ms = lastUpdate.getMonth() + 1;
          const ds = lastUpdate.getUTCDate();
          const ys = lastUpdate.getFullYear();
          const todayFormat = y + "-" + m + "-" + d;
          const updateFormat = ys + "-" + ms + "-" + ds;
          const isToday = todayFormat === updateFormat;
          console.log(new Date(checkAbsen[0].createdAt).getUTCDate());
          console.log(lastUpdate.getUTCDate());
          console.log(isToday);
          console.log(todayFormat);
          console.log(updateFormat);
          if (!isToday) {
            const data = {
              latitude,
              longitude,
              user_id,
            };

            const createAbsen = await models.absen.create(data);
            res.status(201).json({
              success: "true",
              data: createAbsen,
              message: "Berhasil",
            });
          } else {
            res.status(409).json({
              success: "false",
              message: "Tanggal Sama",
            });
          }
        } else {
          const data = {
            latitude,
            longitude,
            user_id,
          };

          const createAbsen = await models.absen.create(data);
          res.status(201).json({
            success: "true",
            data: createAbsen,
            message: "Absen Pertama Berhasil",
          });
        }
      } catch (error) {
        res.status(500).json({
          success: "false",
          error: "Server Error",
          message: error.message,
        });
      }
    } else {
      res.status(422).json({
        success: "false",
        message: error,
      });
    }
  }
);

module.exports = router;
