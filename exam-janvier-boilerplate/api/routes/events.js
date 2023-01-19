const router = require("express").Router();
const Event = require("../models/events");
const NotFoundError = require("../utils/NotFoundError");
const Children = require("../models/children");

// Find all
router.get("/", (req, res, next) => {
  Event.find({})
    .then((events) => res.json(events))
    .catch((err) => next(err));
});

// Find by ID
router.get("/:id", (req, res, next) => {
  Event.findById(req.params.id)
    .then((event) => {
      if (event) {
        res.json(event);
      } else {
        throw new NotFoundError();
      }
    })
    .catch((err) => next(err));
});

// Delete one
router.delete("/:id", (req, res, next) => {
  Event.findByIdAndRemove(req.params.id)
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
  if (!body.child) errorMessages.push("child must be present");
  if (!body.date) errorMessages.push("date must be present");
  if (errorMessages.length > 0) {
    res.status(422).json({ errorMessages });
    return;
  }
  Children.findById(req.body.child)
    .then((children) => {
      if (!children) {
        throw new NotFoundError();
      } else {
        const ev = new Event(body);
        ev.save()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => next(err));
      }
    })
    .catch((err) => next(err));
});

module.exports = router;
