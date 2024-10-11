const express = require("express");
const carsRouter = require("./cars");

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: "ping successfully" });
});
router.use("/cars", carsRouter);

module.exports = router;