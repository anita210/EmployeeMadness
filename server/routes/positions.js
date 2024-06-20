const express = require("express");
const router = express.Router();
const PositionModel = require("../db/position.model");

router.get("/", async (req, res) => {
    try {
        const positions = await PositionModel.find();
        console.log("posit:",positions);
        return res.json(positions);
    }
    catch (error) {
        console.error(error)
    }
})

module.exports = router;