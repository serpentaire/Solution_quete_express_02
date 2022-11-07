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

const postUser = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;
  databaseuser
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the user");
    });
};



module.exports = {
  getUsers,
  getUsersById,
  postUser,
};