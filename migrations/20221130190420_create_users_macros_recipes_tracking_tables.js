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
        table.string("password").notNullable;
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
        table.decimal("weight").notNullable();
        table.decimal("height").notNullable();
        table.integer("age").notNullable();
        table.integer("tdee").notNullable();
        table.decimal("pro").notNullable();
        table.decimal("carb").notNullable();
        table.decimal("fat").notNullable();
        table.decimal("pro_percent");
        table.decimal("carb_percent").notNullable();
        table.decimal("fat_percent").notNullable();
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
        table.integer("likes").notNullable();
        table.table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
      //INGREDIENTS TABLE
      .createTable("ingredients", (table) => {
        table.increments("id").primary();
        table.string("ingredient_name").notNullable();
        table.table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
      //RECIPES_INGREDIENTS TABLE
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
