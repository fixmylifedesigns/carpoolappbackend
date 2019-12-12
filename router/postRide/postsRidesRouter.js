const router = require("express").Router();

const Rides = require("./postsRidesModel");
const restricted = require("../auth/middleware/restrictedMiddleware");
const {
  verifyDriver,
  prepNewRide,
  verifyPostExist
} = require("./middleware");

router.get("/", (req, res) => {
  Rides.getAllPosts()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res
        .status(500)
        .json({ req, error, message: "error retrieving all posts" });
    });
});

router.get(
  "/:id",
  verifyPostExist,
  (req, res) => {
    Rides.findById(req.params.id)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
        res
          .status(500)
          .json({ err, message: "we ran into an error retreving the user" });
      });
  }
);

router.post("/", 
restricted,
 prepNewRide, 
async (req, res) => {
  const post = req.body;
    try {
      const inserted = await Posts.add(post);
      res.status(201).json(inserted);
    } catch (error) {
      res
        .status(500)
        .json({
          error,
          message: "we ran into an error posting your ride"
        });
  }
});

// router.put("/:id", restricted, verifyPostOwner, (req, res) => {
//   Rides.update(req.params.id, req.body)
//     .then(update => {
//       return res.status(200).json(update);
//     })
//     .catch(err => {
//       res.status(500).json({ err, message: "error updating your post" });
//     });
// });

router.delete("/:id", restricted, verifyDriver, (req, res) => {
  Rides.remove(req.params.id)
    .then(del => {
      res
        .status(200)
        .json({ message: "the post has successfully been deleted" })
        .end(del);
    })
    .catch(err => {
      res.status(500).json({ err, message: "this post does not exist" });
    });
});

module.exports = router;
