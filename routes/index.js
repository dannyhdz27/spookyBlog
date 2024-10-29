const router = require("express").Router();

router.get("/health", (req, res, next) => {
  try {
    res.send({
      message: "API is up and running",
    });
  } catch (error) {
    console.error("error accessing API");
  }
});

const blogsRouter = require("./blogs");
router.use("/blogs", blogsRouter);

const usersRouter = require("./users");
router.use("/users", usersRouter);

module.exports = router;
