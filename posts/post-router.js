const express = require("express");
const db = require("../data/db.js");

const router = express.Router();

// send a POST request to /api/posts to create a new post
router.post("/", (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    res
      .status(400)
      .json({ errorMessage: "Post must contain a title and contents" });
  } else {
    db.insert({ title, contents })
      .then(() => {
        res.status(201).json({ title, contents });
      })
      .catch(() => {
        res.status(500).json({
          errorMessage:
            "There was an error while saving the post to the database"
        });
      });
  }
});

module.exports = router;
