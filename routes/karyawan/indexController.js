const models = require("../../models");
const { validationResult, check } = require("express-validator");

var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const offset = limit * page - limit;
  try {
    const karyawans = await models.karyawan.findAll({
      limit: limit,
      offset: offset,
    });
    if (karyawans.length > 0) {
      res.status(200).json({
        success: "true",
        data: karyawans,
      });
    } else {
      res.status(404).json({
        success: "false",
        message: "Data Karyawan tidak ditemukan.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: "false",
      error: "Server Error",
      message: error,
    });
  }
});

router.post(
  "/",
  [
    check("name").exists().withMessage("require"),
    check("email").exists().withMessage("require"),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (error.isEmpty()) {
      const { name, email, jabatan, deskripsi, photo } = req.body;
      try {
        const checkKaryawan = await models.karyawan.findOne({
          where: {
            email: email,
          },
        });
        const data = {
          name,
          email,
          jabatan,
          deskripsi,
          photo,
        };
        if (checkKaryawan) {
          res.status(409).json({
            success: "false",
            message: "Email Telah Terdaftar!",
          });
        } else {
          const addKaryawan = await models.karyawan.create(data);
          res.status(201).json({
            success: "true",
            data: addKaryawan,
            message: "Karyawan Berhasil Dibuat",
          });
        }
      } catch (err) {
        res.status(500).json({
          success: "false",
          error: "Server Error",
          message: err,
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

router.put(
  "/",
  [
    check("id").exists().withMessage("require"),
    check("name").exists().withMessage("require"),
    check("email").exists().withMessage("require"),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (error.isEmpty()) {
      const { id, name, email, jabatan, deskripsi, photo } = req.body;
      try {
        const checkKaryawan = await models.karyawan.findOne({
          where: {
            id: id,
          },
        });
        if (!checkKaryawan) {
          res.status(404).json({
            success: "false",
            message: "Email Belum Terdaftar!",
          });
        } else {
          const data = {
            name,
            email,
            jabatan,
            deskripsi,
            photo,
          };

          const updateKaryawan = await checkKaryawan.update(data);
          res.status(201).json({
            success: "true",
            data: updateKaryawan,
            message: "Karyawan Berhasil Di Update",
          });
        }
      } catch (err) {
        res.status(500).json({
          success: "false",
          error: "Server Error",
          message: err,
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

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const checkKaryawan = await models.karyawan.findOne({
      where: {
        id: id,
      },
    });
    if (!checkKaryawan) {
      res.status(409).json({
        success: "false",
        message: "Karyawan Tidak Ditemukan!",
      });
    } else {
      const deleteKaryawan = await models.karyawan.destroy({
        where: { id },
      });
      res.status(201).json({
        success: "true",
        data: deleteKaryawan,
        message: "Karyawan Berhasil Dihapus",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: "false",
      error: "Server Error",
      message: err,
    });
  }
});

module.exports = router;
