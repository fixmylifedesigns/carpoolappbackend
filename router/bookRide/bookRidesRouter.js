const router = require("express").Router();

const Book = require("./bookRidesModel");

const Rides = require("../postRide/postsRidesModel");

const restricted = require("../auth/middleware/restrictedMiddleware");
const {
  verifyPostOwner,
  prepBooking,
  verifyPostExist
} = require("./middleware");

router.get("/", (req, res) => {
  Book.getAllPosts()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res
        .status(500)
        .json({ req, error, message: "error retrieving all bookings" });
    });
});

router.get(
  "/:id",
  // verifyPostExist,
  (req, res) => {
    Book.findById(req.params.id)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
        res
          .status(500)
          .json({ err, message: "we ran into an error retreving the booking" });
      });
  }
);

// router.post(
//   "/",
//   restricted, prepNewPost,
//   async (req, res) => {
//     const booking = req.body;
//     try {
//       const inserted = await Book.add(booking);
//       res.status(201).json(inserted);
//     } catch (error) {
//       res.status(500).json({
//         error,
//         message: "we ran into an error booking this trip"
//       });
//     }
//   }
// );

router.post("/", restricted, prepBooking, async (req, res) => {
  const booking = req.body;

  Book.add(booking)
    .then(inserted => {
      let newbody = {};
      newbody.taken_seats = inserted.taken_seats + 1;
      Rides.update(req.body.ride_id, newbody)
        .then(update => {
          if (update.vacant_seats <= update.taken_seats) {
            Rides.update(req.body.ride_id, {
              availability: false,
              taken_seats: inserted.vacant_seats
            })
              .then(taken => {
                return res.status(200).json(taken);
              })
              .catch(err => {
                res.status(500).json(err);
              });
          } else {
            return res.status(200).json(update);
          }
        })
        .catch(err => {
          res.status(500).json({ err, message: "error updating your post" });
        });
      // res.status(201).json(inserted);
    })
    .catch(err => {
      res.status(500).json({ err, message: "error updating your post" });
    });
});

router.delete(
  "/:id",
  // restricted, verifyPostOwner,
  (req, res) => {
    Book.remove(req.params.id)
      .then(del => {
        res
          .status(200)
          .json({ message: "the booking has successfully been deleted" })
          .end(del);
      })
      .catch(err => {
        res.status(500).json({ err, message: "this post does not exist" });
      });
  }
);

module.exports = router;
