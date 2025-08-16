const express = require("express");
const Task = require("../models/tasks");
const User = require("../models/users");

const { checkForAuthenticationCookie } = require("../middlewares/auth");

const router = express.Router();

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signup", async (req, res) => {
  const { fullname, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.render("login", { err: "User already exists." });
  }
  await User.create({ fullname, email, password });
  const token = await User.matchPasswordAndGenearateUserToken(
      email,
      password
    );
  return res.cookie("token", token).redirect("/");
});

router.get("/login", (req, res) => {
  res.clearCookie("token");
  return res.render("login");
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await User.matchPasswordAndGenearateUserToken(
      email,
      password
    );
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("login", {
      error: "Invalid E-mail or Password",
    });
  }
});

router.get("/", checkForAuthenticationCookie("token"), async (req, res) => {
  if (req.user) {
    console.log(req.user._id);
    const createdBy = req.user._id;
    const tasks = await Task.find({ createdBy });
    return res.render("welcome", {
      all_tasks: tasks,
    });
  }else{
    return res.redirect("/login");
  }
});

router.post("/",checkForAuthenticationCookie("token"), async (req, res) => {
  const task_ = req.body.task;
  if(!task_) return res.redirect("/");
  
  await Task.create({
    task:task_,
    createdBy: req.user._id,
  });
  return res.redirect("/");
});


router.delete("/:id",checkForAuthenticationCookie("token"),async (req,res)=>{
    const id = req.params.id;
    try {
        await Task.findByIdAndDelete(id);
        return res.render("welcome")
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
