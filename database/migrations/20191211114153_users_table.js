exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments();

    tbl.string("password", 128);

    tbl
      .string("email", 128)
      .notNullable()
      .unique();

    tbl.string("first_name", 128).notNullable();

    tbl.string("last_name", 128).notNullable();

    tbl.string("vehicle_type", 128);

    tbl.string("vehicle_no", 128);

    tbl.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
