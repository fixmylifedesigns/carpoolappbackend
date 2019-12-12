
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('booked_rides').del()
    .then(function () {
      // Inserts seed entries
      return knex('booked_rides').insert([
        {id: 1, passager_id: 1, ride_id: 1},
      ]);
    });
};
