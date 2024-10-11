const carsService = require("../services/cars"); // Importing the cars service for data operations
const { successResponse } = require("../utils/response"); // Importing utility for sending successful responses

// Function to get a car by its ID
exports.getCarsbyId = (req, res, next) => {
    const { id } = req.params; // Extracts the car ID from request parameters
    const data = carsService.getCarsbyId(id); // Retrieves the car data using the service
    successResponse(res, data); // Sends the retrieved data in a success response
};

// Function to get all cars
exports.getCars = (req, res, next) => {
    const data = carsService.getAllCars(); // Retrieves all car data using the service
    successResponse(res, data); // Sends the retrieved data in a success response
};

// Function to create a new car
exports.createCars = async (req, res, next) => {
    const data = await carsService.createCars(req.body, req.files); // Creates a new car using the service
    successResponse(res, data); // Sends the created car data in a success response
};

// Function to update an existing car
exports.updateCars = async (req, res, next) => {
    const { id } = req.params; // Extracts the car ID from request parameters
    const data = await carsService.updateCars(id, req.body, req.files); // Updates the car data using the service
    successResponse(res, data); // Sends the updated car data in a success response
};

// Function to delete a car by its ID
exports.deleteCarsbyId = (req, res, next) => {
    const { id } = req.params; // Extracts the car ID from request parameters
    const data = carsService.deleteCarsbyId(id); // Deletes the car data using the service
    successResponse(res, data); // Sends a success response for the deleted car
};
