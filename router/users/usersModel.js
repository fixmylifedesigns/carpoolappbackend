const db = require("../../database/dbConfig.js");

module.exports = {
  getUsers,
  // find,
  findBy,
  findById,
  update,
  remove
};

// function getUsers() {
//   return db.from("users").select("id");
// }

function getUsers() {
  return db("users");
}

// function find() {
//   return db("users").select(
//     "id",
//     "username",
//     "created_at",
//     "updated_at"
//   );
// }

function findBy(filter) {
  return db("users").where(filter);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function update(id, changes) {
  return db("users")
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

function remove(id) {
  return db("users")
    .where({ id })
    .del();
}
