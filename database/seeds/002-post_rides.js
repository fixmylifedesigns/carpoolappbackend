exports.seed = function(knex) {
  // Deletes ALL existing entries
  return (
    knex("post_rides")
      // .del()
      .then(function() {
        // Inserts seed entries
        return knex("post_rides").insert([
          {
            id: 1,
            user_id: 1,
            vehicle_type: "car",
            vehicle_no: "he82d2",
            description: "I will be outside the building",
            pick_up: "new york",
            drop_off: "new jersey",
            vacant_seats: 3,
            taken_seats: 1,
            time: "2018-11-29T00:00:00.000Z",
            availability: true
          }
          // { id: 2, colName: "rowValue2" },
          // { id: 3, colName: "rowValue3" }
        ]);
      })
  );
};
