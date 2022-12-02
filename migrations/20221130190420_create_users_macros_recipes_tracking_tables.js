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
        table.decimal("weight").notNullable();
        table.decimal("height").notNullable();
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
        table.decimal("bmi").notNullable();
        table.integer("bmr").notNullable();
        table.decimal("targeted_weight").notNullable();
        table.integer("calories_need").notNullable();
        table.decimal("pro").notNullable();
        table.decimal("carb").notNullable();
        table.decimal("fat").notNullable();
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
      //RECIPES TABLE
      .createTable("recipes", (table) => {
        table.increments("id").primary();
        table
          .integer("users_id")
          .notNullable()
          .unsigned()
          .references("id")
          .inTable("users")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table.string("recipe_name").notNullable();
        table.string("image").notNullable();
        table.string("ingredients").notNullable();
        table.string("description").notNullable();
        table.string("step_1").notNullable();
        table.string("step_2").notNullable();
        table.string("step_3").notNullable();
        table.string("step_4").notNullable().defaultTo("");
        table.string("step_5").notNullable().defaultTo("");
        table.string("step_6").notNullable().defaultTo("");
        table.string("step_7").notNullable().defaultTo("");
        table.integer("likes").notNullable().defaultTo("");
        table.table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
      //RECIPE COMMENTS TABLE
      .createTable("recipes_comments", (table) => {
        table.increments("id").primary();
        table.string("comment").notNullable();
        table.string("");
        table
          .integer("recipes_id")
          .notNullable()
          .unsigned()
          .references("id")
          .inTable("recipes")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
      })
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
