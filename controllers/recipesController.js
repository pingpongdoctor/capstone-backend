const recipes_users = require("../seeds_data/recipes_users");

const knex = require("knex")(require("../knexfile"));

//CALLBACK METHOD TO GET ALL RECIPES
exports.getAllRecipes = (req, res) => {
  knex("recipes")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).send("Can not fetch the recipes data");
    });
};

//CALLBACK METHOD TO GET A SINGLE RECIPE
exports.getSingleRecipe = (req, res) => {
  knex("recipes")
    .where("id", req.params.id)
    .then((data) => {
      res.status(200).json(data[0]);
    })
    .catch((error) => {
      res.status(500).send("Can not get the recipe");
    });
};

//CALLBACK FUNCTION TO LIKE A RECIPE
exports.likeRecipe = (req, res) => {
  knex("recipes")
    .where("id", req.params.id)
    .increment("likes", 1)
    .then((data) => {
      res.status(200).send("The like number of this recipe is updated");
    })
    .catch((error) => {
      res.status(500).send("Can not increase the like number");
    });
};

//CALLBACK METHOD TO GET ALL COMMENTS OF A SINGLE RECIPE
exports.getAllComments = (req, res) => {
  knex("comments")
    .where("recipe_id", req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).send("Can not get comments");
    });
};

//CALLBACK METHOD TO POST A NEW RECIPE
exports.addRecipe = (req, res) => {
  if (req.user) {
    const {
      poster_id,
      recipe_name,
      image,
      level,
      ready_time,
      description,
      ingredients,
      directions,
    } = req.body;
    if (
      !poster_id ||
      !recipe_name ||
      !image ||
      !level ||
      !ready_time ||
      !description ||
      !ingredients ||
      !directions
    ) {
      res.status(400).send("Please post a correct recipe");
    } else {
      knex("recipes")
        .insert({ ...req.body, likes: 0 })
        .then((data) => {
          res.status(201).send("A new recipe has been created");
        })
        .catch((error) => {
          res.status(500).send("Can not create a new recipe");
        });
    }
  } else {
    res.status(400).send("Can not find the user");
  }
};

//CALLBACK METHOD TO UPDATE A RECIPE
exports.updateRecipe = (req, res) => {
  if (req.user) {
    knex("recipes")
      .where("id", req.params.id)
      .update(req.body)
      .then((data) => {
        res.status(200).send("The recipe is updated");
      })
      .catch((error) => {
        res.status(500).send("Can not update the recipe");
      });
  } else {
    res.status(400).send("Can not find the user");
  }
};

//CALLBACK METHOD TO GET ALL RECIPE OF A USER
exports.getUserRecipes = (req, res) => {
  if (req.user) {
    knex("recipes_users")
      .join("users", "users.id", "recipes_users.user_id")
      .join("recipes", "recipes.id", "recipes_users.recipe_id")
      .select(
        "recipes.id",
        "recipes.poster_id",
        "recipes.recipe_name",
        "recipes.image",
        "recipes.level",
        "recipes.ready_time",
        "recipes.description",
        "recipes.ingredients",
        "recipes.directions",
        "recipes.likes",
        "recipes.updated_at"
      )
      .where("recipes_users.user_id", req.user.id)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(500).send("Can not get the data");
      });
  } else {
    res.status(400).send("Can not find the user");
  }
};

//CALLBACK METHOD TO POST A COMMENT
exports.createComment = (req, res) => {
  if (req.user) {
    const { comment, recipe_id, user_id } = req.body;
    if (!comment || !recipe_id || !user_id) {
      res.status(400).send("Please upload the valid comment");
    } else {
      knex("comments")
        .insert({ ...req.body, likes: 0 })
        .then((data) => {
          res.status(201).send("The comment is created");
        })
        .catch((error) => {
          res.status(500).send("Can not create a new comment");
        });
    }
  } else {
    res.status(400).send("Can not find the user");
  }
};

//CALLBACK METHOD TO DELETE A COMMENT
exports.deleteComment = (req, res) => {
  if (req.user) {
    knex("comments")
      .where("id", req.params.commentId)
      .del()
      .then((data) => {
        res.status(200).send("The comment is deleted");
      })
      .catch((error) => {
        res.status(500).send("Can not delete the comment");
      });
  } else {
    res.status(400).send("Can not find the user");
  }
};

//CALLBACK METHOD TO LIKE A COMMENT
exports.likeComment = (req, res) => {
  knex("comments")
    .where("id", req.params.commentId)
    .increment("likes", 1)
    .then((data) => {
      res.status(200).send("Like number of the comment is updated");
    })
    .catch((error) => {
      res.status(500).send("Can not update the like number");
    });
};
