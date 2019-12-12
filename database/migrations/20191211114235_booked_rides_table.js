exports.up = function(knex) {
  return knex.schema.createTable("booked_rides", tbl => {
    tbl.increments();

    tbl
      .integer("passager_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      .notNullable();

    tbl
      .integer("ride_id")
      .references("id")
      .inTable("post_rides")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      .notNullable();

    tbl.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("booked_rides");
};
