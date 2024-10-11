const express = require("express");
const cars = require("../data/cars.json");
const {
    validateGetCarById,
    validateCreateCar,
    validateUpdateCar,
    validateDeleteCarById,
} = require("../middlewares/cars")
const {
    getCarById,
    createCar,
    updateCar,
    deleteCarById,
} = require("../controllers/cars")
const router = express.Router();

router.get('/', (req, res) => {
    res.json({car});
});

router.get('/:id', validateGetCarById, getCarById);
router.post("/", validateCreateCar, createCar);
router.put("/:id", validateUpdateCar, updateCar);
router.delete("/:id", validateDeleteCarById, deleteCarById);

module.exports = router;