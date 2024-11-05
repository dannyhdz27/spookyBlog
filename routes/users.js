const { createUser, getUserByUsername } = require("../database/adapters/users");

const { authRequired } = require("./auth");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const usersRouter = require("express").Router();

usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const existingUser = await getUserByUsername(username);

    if (existingUser) {
      next({ message: "that user already exists!", name: "auth error" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    console.log("hashed password:", hashedPassword);
    const newUser = await createUser({ username, password: hashedPassword });
    delete newUser.password;
    const token = jwt.sign(newUser, JWT_SECRET);

    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });

    res.send({
      success: true,
      message: "thank you for signing up!",
      data: newUser,
    });
  } catch (error) {
    console.error("There was an issue registering a new user");
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await getUserByUsername(username);
    console.log("Retrieved user:", user);

    if (!user) {
      next({ message: "That user does not exist!", name: "auth error" });
      return;
    }

    const checkedpassword = await bcrypt.compare(password, user.password);
    console.log("Password comparison result:", checkedpassword);

    if (checkedpassword) {
      delete user.password;
      const token = jwt.sign(user, JWT_SECRET);
      res.cookie("token", token, {
        sameSite: "strict",
        httpOnly: true,
        signed: true,
      });
      res.json({ success: true, message: "Login successful", data: user });
    } else {
      next({ message: "Invalid login credentials" });
      return;
    }
  } catch (error) {
    console.error("Login error:", error);
    next(error);
  }
});

usersRouter.get("/me", authRequired, async (req, res, next) => {
  res.send({ success: true, message: "you are authorized!", user: req.user });
});

usersRouter.get("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    res.send({
      success: true,
      message: "You are logged out!",
    });
  } catch (error) {
    console.error("There was an issue logging out");
    next(error);
  }
});

module.exports = usersRouter;
