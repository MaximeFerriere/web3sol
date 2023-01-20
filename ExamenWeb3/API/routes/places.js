const router = require("express").Router();
const Place = require("../models/place");

// Find all
router.get("/", (req, res) => {
  Place.find({})
    .then((place) => res.json(place))
    .catch((err) => next(err));
});

// Delete one
router.delete("/:id", (req, res) => {
  Place.findByIdAndRemove(req.params.id)
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
  console.log("post methode body " + body);
  // Check body
  const errorMessages = [];
  if (!body.name) errorMessages.push("name must be present");
  if (errorMessages.length > 0) {
    res.status(422).json({ errorMessages });
    return;
  }
  // Check existing
  Place.find({ name: body.name })
    .then((place) => {
      if (place && place.length > 0) {
        errorMessages.push("name must be unique");
        res.status(422).json({ errorMessages });
      } else {
        // Insert
        const place = new Place(body);
        place
          .save()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => next(err));
        //}
      }
    })
    .catch((err) => next(err));
});

module.exports = router;
