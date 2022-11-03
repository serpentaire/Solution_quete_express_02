const databaseuser = require("./database");

const getUsers = (req, res) => {
  databaseuser
    .query("select * from users")
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.sendstatus(200);
    });
};

const getUsersById = (req, res) => {
  const id = parseInt(req.params.id);

  databaseuser
  .query("select * from users where id = ?", [id])
  .then(([users]) => {
    if (users[0] != null) {
      res.json(users[0]);
    } else {
      res.status(404).send("Not Found");
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error retrieving data from database");
  });
};

module.exports = {
  getUsers,
  getUsersById,
};