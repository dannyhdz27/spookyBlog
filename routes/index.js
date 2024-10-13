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

module.exports = router;
