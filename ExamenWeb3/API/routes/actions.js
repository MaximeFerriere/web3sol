const router = require("express").Router();
const Action = require("../models/action");

// Find all
router.get("/", (req, res) => {
  Action.find({})
    .then((action) => res.json(action))
    .catch((err) => next(err));
});

// Delete one
router.delete("/:id", (req, res) => {
  Action.findByIdAndRemove(req.params.id)
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

// Insert one
router.post("/", (req, res) => {
  const body = req.body;
  // Check body
  const errorMessages = [];
  if (!body.name) errorMessages.push("name must be present");
  if (errorMessages.length > 0) {
    res.status(422).json({ errorMessages });
    return;
  }
  // Check existing
  Action.find({ name: body.name })
    .then((action) => {
      if (action.name.length < 3) {
        // **** ICI **** //
        errorMessages.push("name must contain min 3 characters");
        res.status(422).json({ errorMessages });
      } else {
        // Insert
        const action = new Action(body);
        action
          .save()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => next(err));
      }
    })
    .catch((err) => next(err));
});

module.exports = router;
