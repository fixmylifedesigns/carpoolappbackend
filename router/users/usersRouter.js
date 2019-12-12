const router = require("express").Router();

const Users = require("./usersModel");

router.get("/", (req, res) => {
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

router.get("/:id", (req, res) => {
    Users.findById(req.params.id)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        res
          .status(500)
          .json({ err, message: "we ran into an error retreving the user" });
      });
  });

module.exports = router;
