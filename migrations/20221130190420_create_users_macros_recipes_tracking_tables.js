/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return (
    knex.schema
      //USERS TABLE
      .createTable("users", (table) => {
        table.increments("id").primary();
        table.string("username").notNullable();
        table.string("email").notNullable();
        table.string("password").notNullable();
        table.string("gender").notNullable();
        table.integer("age").notNullable();
        table.integer("weight").notNullable();
        table.integer("height").notNullable();
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
      //MACROS TABLE
      .createTable("macros", (table) => {
        table.increments("id").primary();
        table
          .integer("users_id")
          .notNullable()
          .unsigned()
          .references("id")
          .inTable("users")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table.string("macro_name").notNullable();
        table.integer("bmi").notNullable();
        table.integer("bmr").notNullable();
        table.integer("targeted_weight").notNullable();
        table.string("activity").notNullable();
        table.integer("tdee").notNullable();
        table.integer("tdee_need").notNullable();
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
      //RECIPES TABLE
      .createTable("recipes", (table) => {
        table.increments("id").primary();
        //USER ID IS OPTIONAL
        table
          .integer("users_id")
          .unsigned()
          .references("id")
          .inTable("users")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table.string("recipe_name").notNullable();
        table.string("image").notNullable();
        table.integer("ready_minute").notNullable();
        table.string("description").notNullable();
        table.string("step_1").notNullable();
        table.string("step_2").notNullable();
        table.string("step_3");
        table.string("step_4");
        table.string("step_5");
        table.integer("likes").notNullable();
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
      //INGREDIENTS TABLE
      .createTable("ingredients", (table) => {
        table.increments("id").primary();
        table.string("ingredient").notNullable();
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
      //RECIPES AND INGREDIENTS TABLE
      .createTable("recipes_ingredients", (table) => {
        table.increments("id").primary();
        table
          .integer("recipes_id")
          .notNullable()
          .unsigned()
          .references("id")
          .inTable("recipes")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table
          .integer("ingredients_id")
          .notNullable()
          .unsigned()
          .references("id")
          .inTable("ingredients")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
      //RECIPE COMMENTS TABLE
      .createTable("recipes_comments", (table) => {
        table.increments("id").primary();
        table.string("comment").notNullable();
        table
          .integer("recipes_id")
          .notNullable()
          .unsigned()
          .references("id")
          .inTable("recipes")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table
          .integer("users_id")
          .notNullable()
          .unsigned()
          .references("id")
          .inTable("recipes")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable("recipes_comments")
    .dropTable("recipes_ingredients")
    .dropTable("ingredients")
    .dropTable("recipes")
    .dropTable("macros")
    .dropTable("users");
};
