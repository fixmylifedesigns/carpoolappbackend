const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return (
    knex("users")
      // .del()
      .then(function() {
        // Inserts seed entries
        return knex("users").insert([
          {
            id: 1,
            first_name: "james",
            last_name: "last",
            password: bcrypt.hashSync("password", 10),
            email: "james@gmail.com",
            vehicle_type: "car",
            vehicle_no: "he82d2"
          },
          {
            id: 2,
            first_name: "james",
            last_name: "last",
            password: bcrypt.hashSync("password", 10),
            email: "jadmses@gmail.com",
            vehicle_type: "car",
            vehicle_no: "he82d2"
          }
        ]);
      })
  );
};
