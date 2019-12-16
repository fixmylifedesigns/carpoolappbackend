exports.seed = function(knex) {
  // Deletes ALL existing entries
  return (
    knex("post_rides")
      // .del()
      .then(function() {
        // Inserts seed entries
        return knex("post_rides").insert([
          {
            user_id: 1,
            vehicle_type: "car",
            vehicle_no: "he82d2",
            description: "I will be outside the building",
            pick_up: "new york",
            drop_off: "new jersey",
            vacant_seats: 3,
            taken_seats: 1,
            date: "2018-11-29T00:00:00.000Z",
            time: "21:00:00",
            availability: true
          },
          {
            user_id: 1,
            vehicle_type: "car",
            vehicle_no: "he82d2",
            description: "I will be outside the building",
            pick_up: "new jersey",
            drop_off: "new york",
            vacant_seats: 3,
            taken_seats: 1,
            date: "2018-11-29T00:00:00.000Z",
            time: "21:00:00",
            availability: true
          }
        ]);
      })
  );
};
