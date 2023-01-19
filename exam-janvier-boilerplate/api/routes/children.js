const router = require("express").Router();
const Children = require("../models/children");
const NotFoundError = require("../utils/NotFoundError");

// Find all
router.get("/", (req, res, next) => {
  Children.find({})
    .then((children) => res.json(children))
    .catch((err) => next(err));
});

// Find by ID
router.get("/:id", (req, res, next) => {
  Children.findById(req.params.id)
    .then((children) => {
      if (children) {
        res.json(children);
      } else {
        throw new NotFoundError();
      }
    })
    .catch((err) => next(err));
});

// Delete one
router.delete("/:id", (req, res, next) => {
  Children.findByIdAndRemove(req.params.id)
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        throw new NotFoundError();
      }
    })
    .catch((err) => next(err));
});

// Insert one
router.post("/", (req, res, next) => {
  const body = req.body;
  // Check body
  const errorMessages = [];
  if (!body.name) errorMessages.push("name must be present");
  if (!body.birthDate) errorMessages.push("birthDate must be present");
  if (!body.gender) errorMessages.push("gender must be present");
  if (!body.name.length > 3)
    errorMessages.push("name must be longer than 3 characters");
  if (errorMessages.length > 0) {
    res.status(422).json({ errorMessages });
    return;
  }
  const child = new Children(body);
  child
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => next(err));
});

module.exports = router;
