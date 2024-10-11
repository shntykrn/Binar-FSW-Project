const cars = require("../data/cars.json");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

exports.getCarById = (id) => {
    const searchCar = car.find((car) => car.id == id);
    return searchCar;
};

exports.createCar = (data) => {
    const newCar = {
        id: uuidv4(),
        ...data,
    };

    car.push(newCar);

    fs.writeFileSync(
        "./data/cars.json",
        JSON.stringify(cars, null, 4),
        "utf-8"
    );

    return newCar;
};

exports.updateCar = (id, data) => {
    const searchCar = car.find((car) => car.id == id);
    if (!searchCar) {
        throw new NotFoundError("Car is Not Found!");
    }

    Object.assign(searchCar, data);

    fs.writeFileSync(
        "./data/cars.json",
        JSON.stringify(cars, null, 4),
        "utf-8"
    );

    return searchCar;
};

exports.deleteCarById = (id) => {
    const carIndex = cars.findIndex((cars) => cars.id == id);

    if (carIndex < 0) {
        return null;
    }

    const deletedCar = car.splice(carIndex, 1);

    fs.writeFileSync(
        "./data/cars.json",
        JSON.stringify(cars, null, 4),
        "utf-8"
    );
    return deletedCar;
};

