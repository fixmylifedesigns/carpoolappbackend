const Booking = require("../bookRidesModel");
const Rides = require("../../postRide/postsRidesModel");

module.exports = {
  verifyPostOwner,
  prepBooking,
  verifyPostExist
};

function prepBooking(req, res, next) {
  Rides.findById(req.body.ride_id).then(ride => {
    if (req.decodedToken.id === ride.driver_id) {
      res.status(400).json({ message: "You can not book your own ride" });
    } else if (!ride.availability) {
      res.status(400).json({ message: "No seats available" });
    } else {
      req.body.passager_id = req.decodedToken.id;
      next();
    }
  });
}

async function verifyPostOwner(req, res, next) {
  try {
    const { passager_id } = await Booking.findById(req.params.id);
    passager_id === req.decodedToken.id
      ? next()
      : res.status(400).json({ message: "User does not own that post" });
  } catch (err) {
    res.status(400).json({ message: "No post with that ID" });
  }
}

async function verifyPostExist(req, res, next) {
  try {
    const { user_id } = await Booking.findById(req.params.id);
    user_id
      ? next()
      : res.status(400).json({ message: "No post with that ID" });
  } catch (err) {
    res.status(400).json({ message: "No post with that ID" });
  }
}
