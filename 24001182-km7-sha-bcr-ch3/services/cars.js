const carsRepository = require("../repositories/cars"); // Importing the cars repository to handle data operations for cars
const { imageUpload } = require("../utils/image-kit"); // Importing utility for uploading images
const { NotFoundError, InternalServerError } = require("../utils/request"); // Importing custom error classes for handling specific HTTP errors

// Function to get a car by its ID from the repository
exports.getCarsbyId = (id) => {
    const cars = carsRepository.getCarsbyId(id);
    if (!cars) {
        throw new NotFoundError("Cars is Not Found!"); // Throw a 404 error if car is not found
    }
    return cars;
};

// Function to get all cars from the repository
exports.getAllCars = () => {
    return cars; // Assuming 'cars' is the array of car data
};

// Function to create a new car, with optional image upload
exports.createCars = async (data, file) => {
    if (file?.image) {
        data.image = await imageUpload(file.image); // If image is provided, upload it and add the URL to the data
    }       
    return carsRepository.createCars(data); // Call repository to create a new car entry
};

// Function to update an existing car entry by merging new data
exports.updateCars = async (id, data, file) => {
    const existingCars = carsRepository.getCarsbyId(id);
    if (!existingCars) {
        throw new NotFoundError("Cars is Not Found!"); // Throw a 404 error if car is not found
    }

    // Merge existing car data with the new data provided
    data = {
        ...existingCars,
        ...data,
    };

    if (file?.image) {
        data.image = await imageUpload(file.image); // Upload new image if provided
    }

    const updatedCars = carsRepository.updateCars(id, data);
    if (!updatedCars) {
        throw new InternalServerError(["Failed to update Cars!"]); // Throw a 500 error if the update fails
    }

    return updatedCars;
};

// Function to delete a car by its ID
exports.deleteCarsbyId = (id) => {
    const existingCars = carsRepository.getCarsbyId(id);
    if (!existingCars) {
        throw new NotFoundError("Cars is Not Found!"); // Throw a 404 error if car is not found
    }

    const deletedCars = carsRepository.deleteCarsbyId(id);
    if (!deletedCars) {
        throw new InternalServerError(["Failed to delete Cars!"]); // Throw a 500 error if the deletion fails
    }

    return deletedCars;
};
