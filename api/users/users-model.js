const db = require("../../database/dbConfig");

module.exports = {
    add,
    find,
    findBy,
    findById,
  };

function find() {
    return db("users").select("id", "username");
}

function findBy(key){
  return db("users").where(key)
}

async function add(user) {
    console.log("got here")
  try {
      console.log("also got here")
    const [id] = await db("users").insert(user, "id");
    console.log(id)
    return findById(id);
  } catch (error) {
    throw error;
  }
}

function findById(id) {
  return db("users").where({ id }).first();
}