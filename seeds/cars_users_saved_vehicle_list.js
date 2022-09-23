/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
// import seed data files, arrays of objects
const carsData = require('../seed_data/cars');
const usersData = require('../seed_data/users');
const savedVehiclesData = require('../seed_data/saved_vehicles')

exports.seed = function (knex) {
  return knex('cars')
    .del()
    .then(function () {
      return knex('cars').insert(carsData);
    })
    .then(() => {
      return knex('users').del();
    })
    .then(() => {
      return knex('users').insert(usersData);
    })
    .then(() => {
      return knex('saved_vehicles').del();
    })
    .then(() => {
      return knex('saved_vehicles').insert(savedVehiclesData);
    });
};