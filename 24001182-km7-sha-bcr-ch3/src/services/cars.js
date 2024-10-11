const carsRepository = require("../repositories/cars");
const {imageUpload} = require("../utils/image-kit");
const {
    NotFoundError, 
    InternalServerError,
} = require("../utils/request");

exports.getCarsbyId = (id) => {
    const cars = carsRepository.getCarsbyId(id);
    if (!cars) {
        throw new NotFoundError("Cars is Not Found!");
    }
    return cars;
};

exports.createCars = async (data, file) => {
    if(file?.image){
        data.image = await imageUpload(file.image)
    }       
    return carsRepository.createCars(data);
};

exports.updateCars = async (id, data, file) => {
    const existingCars = carsRepository.getCarsbyId(id);
    if (!existingCars) {
        throw new NotFoundError("Cars is Not Found!");
    }

    data = {
        ...existingCars,
        ...data,
    };

    if (file?.image) {
        data.image = await imageUpload(file.image);
    }

    const updatedCars = carsRepository.updateCars(id, data);
    if (!updatedCars) {
        throw new InternalServerError(["Failed to update Cars!"]);
    }

    return updatedCars;
};

exports.deleteCarsbyId = (id) => {
    const existingCars = carsRepository.getCarsbyId(id);
    if (!existingCars) {
        throw new NotFoundError("Cars is Not Found!");
    }

    const deletedCars = carsRepository.deleteCarsbyId(id);
    if (!deletedCars) {
        throw new InternalServerError(["Failed to delete Cars!"]);
    }

    return deletedCars;
};