const express = require("express");
const db = require("../data/db.js");

const router = express.Router();

// send a POST request to /api/posts to create a new post
router.post("/api/posts", (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    res
      .status(400)
      .json({ errorMessage: "Post must contain a title and contents" });
  } else {
    db.insert(req.body)
      .then(db => {
        res.status(201).json(db);
      })
      .catch(() => {
        res.status(500).json({
          errorMessage:
            "There was an error while saving the post to the database"
        });
      });
  }
});

// send a POST request to /api/posts/:id/comments to add a comment to the post
router.post("/:id/comments", (req, res) => {
  const comment = { ...req.body, post_id: req.params.id };
  if (!req.body.text) {
    res.status(400).json({ errorMessage: "Comment missing required field" });
  } else {
    db.insertComment(comment)
      .then(db => {
        res.status(201).json(db);
      })
      .catch(() => {
        res.status(500).json({
          errorMessage:
            "There was an error while saving the post to the database"
        });
      });
  }
});

// send a GET request to /api/posts to read all posts
router.get("/", async (req, res) => {
  try {
    const posts = await db.find(req.body);

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "The posts information could not be retrieved."
    });
  }
});

module.exports = router;
