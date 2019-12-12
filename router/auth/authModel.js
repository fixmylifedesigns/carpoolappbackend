const db = require("../../database/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
  findByEmail,
  addUser
};

function find() {
  return db("users").select("id", "email", "password");
}

function findBy(filter) {
  return db("users").where(filter);
}

async function add(user) {
  const [id] = await db("users").insert(user, "id");

  return findById(id);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function findByEmail(email) {
  return db("users")
    .where({ email })
    .first();
}

function addUser(user) {
  return db("users")
    .insert(user, "id")
    .then(([id]) => {
      return findUserById(id);
    });
}

function findUserById(id) {
  return db("users")
    .where({ id })
    .first();
}
