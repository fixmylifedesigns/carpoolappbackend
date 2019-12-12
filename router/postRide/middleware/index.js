const Driver = require("../postsRidesModel");

module.exports = {
  verifyDriver,
  prepNewRide,
  verifyPostExist
};

function prepNewRide(req, res, next) {
    req.body.user_id = req.decodedToken.id
    req.body.availability = 1;
    next();
}

async function verifyDriver(
  req,
  res,
  next
) {
  try {
    const { driver_id } = await Driver.findById(req.params.id);
    driver_id === req.decodedToken.id
      ? next()
      : res.status(400).json({ message: "User does not own that ride" });
  } catch (err) {
    res.status(400).json({ message: "No ride with that ID" });
  }
}

async function verifyPostExist(
  req,
  res,
  next
) {
  try {
    const { id } = await Driver.findById(req.params.id);
    id
      ? 
      next()
      : res.status(400).json({ message: "No ride with that ID" });
  } catch (err) {
    res.status(400).json({ message: "No ride with that ID" });
  }
}
