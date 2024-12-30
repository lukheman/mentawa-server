const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/user/home/");
});

router.get("/home", (req, res) => {
  res.render("user/home", {
    title: "User | Home",
  });
});

router.get("/signup", (req, res) => {
  res.send("halaman signup");
});

router.get("/signin", (req, res) => {
  res.render("user/signin", {
    title: "User | SignIn",
  });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  //res.render("user/signin", {
  //  title: "User | SignIn",
  //});
});

module.exports = router;
