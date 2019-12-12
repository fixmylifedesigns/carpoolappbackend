
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('booked_rides').del()
    .then(function () {
      // Inserts seed entries
      return knex('booked_rides').insert([
        {passager_id: 2, ride_id: 1},
      ]);
    });
};
