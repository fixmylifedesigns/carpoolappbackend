const db = require("../../database/dbConfig");

module.exports = {
  add,
  remove,
  update,
  getUserPosts,
  getAllPosts,
  findById
};

let selected = [
  { id: "post_rides.id" },
  { driver_id: "users.id" },
  "description",
  "post_rides.vehicle_type",
  "post_rides.vehicle_no",
  "pick_up",
  "drop_off",
  "vacant_seats",
  "taken_seats",
  "time",
  "availability",
  "post_rides.created_at",
  "post_rides.updated_at",
  "users.email",
  "users.first_name",
  "users.last_name"
];

function getAllPosts() {
  return db("post_rides");
  // .join("users", "post_rides.user_id", "=", "users.id")
}

function findById(id) {
  return db("post_rides")
    .where("post_rides.id", id)
    .first()
    .join("users", "post_rides.user_id", "=", "users.id")
    .select(selected);
}

function getUserPosts(id) {
  return db("post_rides")
    .where("post_rides.user_id", id)
    .join("users", "post_rides.user_id", "=", "users.id");
}

async function add(post) {
  const [id] = await db("post_rides").insert(post, "id");

  return findById(id);
}

function remove(id) {
  return db("post_rides")
    .where({ id })
    .del();
}

function update(id, changes) {
  return db("post_rides")
    .where({ id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        return findById(id);
      } else {
        return null;
      }
    });
}
