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
  { id: " booked_rides.id" },
  { ride_id: "post_rides.id" },
  "booked_rides.passager_id",
  { passanger_first_name: "passanger.first_name" },
  { passanger_email: "passanger.email" },
  { driver_id: "post_rides.user_id" },
  { driver_first_name: "driver.first_name" },
  { driver_email: "driver.email" },
  { vehicle_type: "post_rides.vehicle_type" },
  { vehicle_no: "post_rides.vehicle_no" },
  { description: "post_rides.description" },
  { pick_up: "post_rides.pick_up" },
  { drop_off: "post_rides.drop_off" },
  { vacant_seats: "post_rides.vacant_seats" },
  { taken_seats: "post_rides.taken_seats" },
  { time: "post_rides.time" },
  { availability: "post_rides.availability" },
  "post_rides.created_at",
  "post_rides.updated_at"
];

function getAllPosts() {
  return db("booked_rides")
    .join("users as passanger", "booked_rides.passager_id", "=", "passanger.id")
    .join("post_rides", "booked_rides.ride_id", "=", "post_rides.id")
    .join("users as driver", "post_rides.user_id", "=", "driver.id")
    .select(selected);
}

function findById(id) {
  return db("booked_rides")
    .where("booked_rides.id", id)
    .first()
    .join("users as passanger", "booked_rides.passager_id", "=", "passanger.id")
    .join("post_rides", "booked_rides.ride_id", "=", "post_rides.id")
    .join("users as driver", "post_rides.user_id", "=", "driver.id")
    .select(selected);
}

function getUserPosts(id) {
  return db("post_rides")
    .where("post_rides.user_id", id)
    .join("users", "post_rides.user_id", "=", "users.id");
}

async function add(booking) {
  const [id] = await db("booked_rides").insert(booking, "id");

  return findById(id);
}

function remove(id) {
  return db("booked_rides")
    .where({ id })
    .del();
}

function update(id, changes) {
  return db("booked_rides")
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
