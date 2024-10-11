const express = require("express"); // Importing Express.js framework
const cars = require("../data/cars.json"); // Importing car data from a JSON file
const {
    validateGetCarsbyId,
    validateCreateCars,
    validateUpdateCars,
    validateDeleteCarsbyId,
} = require("../middlewares/cars"); // Importing validation middlewares for car-related operations

const {
    getCarsbyId,
    createCars,
    updateCars,
    deleteCarsbyId,
} = require("../controllers/cars"); // Importing car-related controller functions

const router = express.Router(); // Creating an Express router instance

// GET route to retrieve a list of all cars
router.get('/', (req, res) => {
    res.json({ cars }); // Responds with the car data in JSON format
});

// GET route to retrieve a car by its ID
router.get('/:id', validateGetCarsbyId, getCarsbyId); 
// This route uses a validation middleware to ensure the ID is valid before calling the `getCarsbyId` controller function

// POST route to create a new car entry
router.post("/", validateCreateCars, createCars); 
// It validates the request body with `validateCreateCars` before invoking the `createCars` controller to add a new car

// PUT route to update an existing car by its ID
router.put("/:id", validateUpdateCars, updateCars); 
// The `validateUpdateCars` middleware checks if the ID and request body are valid before updating the car using the `updateCars` controller

// DELETE route to remove a car by its ID
router.delete("/:id", validateDeleteCarsbyId, deleteCarsbyId); 
// This route ensures the ID is valid using `validateDeleteCarsbyId` before calling the `deleteCarsbyId` controller to remove the car

module.exports = router; // Exporting the router to be used in the main application
