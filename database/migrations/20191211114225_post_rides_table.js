exports.up = function(knex) {
  return knex.schema.createTable("post_rides", tbl => {
    tbl
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      .notNullable();

    tbl.increments();

    tbl.string("description", 1000).notNullable();

    tbl.string("vehicle_type", 128).notNullable();

    tbl.string("vehicle_no", 128).notNullable();

    tbl.string("pick_up").notNullable();

    tbl.float("pick_up_latitude", 128);

    tbl.float("pick_up_longitude", 128);

    tbl.string("drop_off").notNullable();

    tbl.float("drop_off_latitude", 128);

    tbl.float("drop_off_longitude", 128);

    tbl.integer("vacant_seats").notNullable();

    tbl.integer("taken_seats").notNullable();

    tbl.date("time").notNullable();

    tbl.boolean("availability");

    tbl.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("post_rides");
};
