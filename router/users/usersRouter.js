const router = require("express").Router();
const restricted = require("../auth/middleware/restrictedMiddleware");

const Booked = require("../bookRide/bookRidesModel");
const Users = require("./usersModel");
const Rides = require("../postRide/postsRidesModel");

const UserInfo = (user_id, res, req) => {
  Users.findById(user_id)
    .then(user => {
      Booked.findByPassanger(user_id).then(booked => {
        if (!booked) {
          user.booked_rides = [];
        } else {
          user.booked_rides = booked;
        }
      });
      Rides.getUserPosts(user_id).then(rides => {
        if (!rides) {
          user.posted_rides = [];
        } else {
          user.posted_rides = rides;
        }
        return res.status(200).json(user);
      });
    })
    .catch(err => {
      res
        .status(500)
        .json({ err, message: "we ran into an error retreving the user" });
    });
};

router.get("/all", (req, res) => {
  Users.getUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ err, message: "Cannot retrieve users from database." });
    });
});

router.get("/", restricted, (req, res) => {
  const user_id = req.decodedToken.id;
  UserInfo(user_id, res, req);
});

router.get("/:id", (req, res) => {
  const user_id = req.params.id;
  UserInfo(user_id, res, req);
});

module.exports = router;
