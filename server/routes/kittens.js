const express = require("express");
const router = express.Router();
const KittenModel = require("../db/kitten.model");
const EmployeeModel = require("../db/employee.model");

router.post("/", async (req, res) => {
    const { kitten, employee } = req.body;
    try {

      const saved = await KittenModel.create(kitten);
      const updatedEmployee = await EmployeeModel.findOneAndUpdate(
        { _id: employee._id },
        { $push: { kittens: saved._id } },
        { new: true }
      );
  
      return res.json({ saved, updatedEmployee });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

router.get("/", async (req, res) => {
    
    try {
        const kittens = await KittenModel.find();
        return res.json(kittens);
    }
    catch (err) {
        console.err(err);
    }

})

router.get("/:id", async (req, res) => {
    const kittenId = req.params.id
    try {
        const kitten = await KittenModel.find({ _id: kittenId });
        return res.json(kitten);
    }
    catch (err) {
        console.err(err);
    }

})



module.exports = router;