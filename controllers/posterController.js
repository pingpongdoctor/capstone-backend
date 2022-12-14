const knex = require("knex")(require("../knexfile"));

//CALLBACK METHOD TO GET THE PROFILE OF THE POSTER
exports.getPosterProfile = (req, res) => {
  knex("users")
    .where("id", req.params.posterId)
    .select("username")
    .then((data) => {
      res.status(200).json(data[0]);
    })
    .catch((error) => {
      res.status(500).send("Can not find the poster profile");
    });
};
