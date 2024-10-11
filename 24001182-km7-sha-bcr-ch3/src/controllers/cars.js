const carService = require("../services/cars");
const { successResponse } = require("../utils/response");

exports.getCarById = (req, res, next) => {
    const { id } = req.params;
    const data = carService.getCarsbyId(id);
    successResponse(res, data);
};

exports.createCar = async (req, res, next) => {
    const data = await carService.createCar(req.body, req.files);
    successResponse(res, data);
};

exports.updateCar = async (req, res, next) => {
    const { id } = req.params;
    const data = await carService.updateCar(id, req.body, req.files);
    successResponse(res, data);
};

exports.deleteCarById = (req, res, next) => {
    const { id } = req.params;
    const data = carService.deleteCarById(id);
    successResponse(res, data);
};
