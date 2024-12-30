const express = require("express");
const router = express.Router();
const { tokenValidation, registerUser } = require("../utils/utils.js");
const { userGetByMachineId, isMachineIdExist } = require("../database/db.js");

router.post("/register", (req, res) => {
  const name = req.body.name;
  const machineId = req.body.machineId;
  const email = req.body.email;

  if (!name) {
    return res.status(500).json({
      status: "error",
      message: "required name",
    });
  }

  if (!email) {
    return res.status(500).json({
      status: "error",
      message: "required email",
    });
  }

  if (!machineId) {
    return res.status(500).json({
      status: "error",
      message: "required machineId",
    });
  }

  const result = registerUser(name, email, machineId);
  return res.status(200).json(result);
});

router.post("/tokenvalidation", async (req, res) => {
  const machineId = req.body.machineId;
  const token = req.body.token;

  const result = await tokenValidation(machineId, token);

  res.json(result);
});

router.post("/userinformation", async (req, res) => {
  const machineId = req.body.machineId;
  // res.set('Content-Type', 'routerlication/json');

  try {
    const user = await userGetByMachineId(machineId);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "machineId not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      status: "error",
      message: "an internal server error",
      details: error.message,
    });
  }
});

router.post("/ismachineidregistered", async (req, res) => {
  const machineId = req.body.machineId;

  const result = await isMachineIdExist(machineId);

  if (result) {
    return res.status(200).json({
      status: "success",
      message: "machineId is registered",
    });
  }

  return res.status(500).json({
    status: "error",
    message: "machineId is not registered",
  });
});

module.exports = router;
