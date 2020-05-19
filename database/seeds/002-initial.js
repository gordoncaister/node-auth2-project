
exports.seed = function (knex) {

  const users = [
    {
      username: "groot",
      password: "Iamgroot!",
      department: "retail"
    },
    {
      username: "admin",
      password: "keepitsecret,keepitsafe.",
      department: "retail"
    },
    {
      username: "me",
      password: "changethepass",
      department: "retail"
    },
    {
      username: "nobody",
      password: "hasnorole",
      department: "management"
    },
    {
      username: "notme",
      password: "hasnorole",
      department: "management"
    },
  ];

  return knex("users").insert(users);
};
