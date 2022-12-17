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
          .integer("user_id")
          .notNullable()
          .unsigned()
          .references("id")
          .inTable("users")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table.string("macro_name").notNullable();
        table.integer("targeted_weight").notNullable();
        table.string("body_type").notNullable();
        table.string("goal").notNullable();
        table.string("activity").notNullable();
        table.integer("tdee").notNullable();
        table.integer("tdee_need").notNullable();
        table.string("gender").notNullable();
        table.integer("age").notNullable();
        table.integer("weight").notNullable();
        table.integer("height").notNullable();
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
      //RECIPES TABLE
      .createTable("recipes", (table) => {
        table.increments("id").primary();
        table
          .integer("poster_id")
          .unsigned()
          .references("id")
          .inTable("users")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table.string("recipe_name").notNullable();
        table.string("image").notNullable();
        table.string("level").notNullable();
        table.integer("ready_time").notNullable();
        table.text("description").notNullable();
        table.text("ingredients").notNullable();
        table.text("directions").notNullable();
        table.integer("likes").notNullable();
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
      //RECIPES_USERS TABLE
      .createTable("recipes_users", (table) => {
        table.increments("id").primary();
        table
          .integer("recipe_id")
          .notNullable()
          .unsigned()
          .references("id")
          .inTable("recipes")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table
          .integer("user_id")
          .notNullable()
          .unsigned()
          .references("id")
          .inTable("users")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
      //COMMENTS TABLE
      .createTable("comments", (table) => {
        table.increments("id").primary();
        table.string("comment").notNullable();
        table.integer("likes").notNullable();
        table
          .integer("recipe_id")
          .notNullable()
          .unsigned()
          .references("id")
          .inTable("recipes")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table
          .integer("user_id")
          .notNullable()
          .unsigned()
          .references("id")
          .inTable("users")
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
    .dropTable("recipes_users")
    .dropTable("recipes")
    .dropTable("macros")
    .dropTable("users");
};
