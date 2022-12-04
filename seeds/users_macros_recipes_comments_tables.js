const ingredients = require("../seeds_data/ingredients");
const macros = require("../seeds_data/macros");
const comments = require("../seeds_data/comments");
const recipes_ingredients = require("../seeds_data/recipes_ingredients");
const recipes = require("../seeds_data/recipes");
const users = require("../seeds_data/users");
const recipes_users = require("../seeds_data/recipes_users");

exports.seed = function (knex) {
  //SEED USERS TABLE
  return (
    knex("users")
      .del()
      .then(() => {
        return knex("users").insert(users);
      })
      //SEED MACROS TABLE
      .then(() => {
        return knex("macros").del();
      })
      .then(() => {
        return knex("macros").insert(macros);
      })
      //SEED RECIPES TABLE
      .then(() => {
        return knex("recipes").del();
      })
      .then(() => {
        return knex("recipes").insert(recipes);
      })
      //SEED INGREDIENTS TABLE
      .then(() => {
        return knex("ingredients").del();
      })
      .then(() => {
        return knex("ingredients").insert(ingredients);
      })
      //SEED INGREDIENTS AND RECIPES TABLE
      .then(() => {
        return knex("recipes_ingredients").del();
      })
      .then(() => {
        return knex("recipes_ingredients").insert(recipes_ingredients);
      })
      //SEED COMMENTS TABLE
      .then(() => {
        return knex("comments").del();
      })
      .then(() => {
        return knex("comments").insert(comments);
      })
      //SEED RECIPES_USERS TABLE
      .then(() => {
        return knex("recipes_users").del();
      })
      .then(() => {
        return knex("recipes_users").insert(recipes_users);
      })
  );
};
