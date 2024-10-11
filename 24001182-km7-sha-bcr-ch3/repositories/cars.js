const cars = require("../data/cars.json"); // Importing car data from a JSON file
const fs = require("fs"); // Importing filesystem module to read/write files
const { v4: uuidv4 } = require('uuid'); // Importing UUID library to generate unique IDs

// Function to retrieve a car by its ID
exports.getCarsbyId = (id) => {
    // Searches for a car in the cars array by matching the ID, returns the car if found
    const searchCars = cars.find((cars) => cars.id == id);
    return searchCars;
};

// Function to create a new car
exports.createCars = (data) => {
    const newCars = {
        id: uuidv4(),
        ...data,
    };

    cars.push(newCars);

    fs.writeFileSync(
        "./data/cars.json",
        JSON.stringify(cars, null, 4), // Writes data back to JSON with formatting
        "utf-8"
    );

    return newCars;
};

// Function to update an existing car by its ID
exports.updateCars = (id, data) => {
    const searchCars = cars.find((cars) => cars.id == id);
    if (!searchCars) {
        throw new NotFoundError("Car is Not Found!");
    }

    Object.assign(searchCars, data); 

    fs.writeFileSync(
        "./data/cars.json",
        JSON.stringify(cars, null, 4), 
        "utf-8"
    );

    return searchCars;
};

// Function to delete a car by its ID
exports.deleteCarsbyId = (id) => {
    const carsIndex = cars.findIndex((cars) => cars.id == id);

    if (carsIndex < 0) {
        return null; 
    }

    const deletedCars = cars.splice(carsIndex, 1); 

    fs.writeFileSync(
        "./data/cars.json",
        JSON.stringify(cars, null, 4), 
        "utf-8"
    );

    return deletedCars; 
};
