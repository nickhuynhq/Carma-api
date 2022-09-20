/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("cars", function(table) {
        table.increments("id");
        table.string("brand").notNullable();
        table.string("make").notNullable();
        table.integer("year").notNullable();
        table.float("fuel_economy").notNullable();
        table.float("price").notNullable();
        table.float("maintenance").notNullable();
        table.float("depreciation").notNullable();
        table.float("insurance").notNullable();

    }).createTable("users", function(table){
        table.increments("id");
        table.integer("user_id").unsigned().notNullable();
        table.string("name", 30).notNullable();
        table.date("dob").notNullable();
        table.string("gender").notNullable();
        table.string("province").notNullable();
        table.string("city").notNullable();
        table.float("commute_distance").notNullable();
        table.integer("commute_days").notNullable();

    }).createTable("saved_vehicles", function(table){
        table.increments("id");
        table.integer("user_id").unsigned().notNullable();
        table.integer("car_id").unsigned().notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    // delete the two tables
    return knex.schema.dropTable("saved_vehicle_list").dropTable("users").dropTable("cars");
  
};