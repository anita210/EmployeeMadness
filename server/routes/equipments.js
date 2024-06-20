const express = require("express");
const router = express.Router();
const EquipmentModel = require("../db/equipment.model");



router.get("/", async (req, res) => {
    const equipments = await EquipmentModel.find();
    return res.json(equipments);
});


router.get("/:id", async (req, res) => {
    const equipment = await EquipmentModel.findById(req.params.id);
    return res.json(equipment);
});


//add new equipment
router.post("/", async (req, res, next) => {
    const equipment = req.body;

    try {
        const saved = await EquipmentModel.create(equipment);
        return res.json(saved);
    } catch (err) {
        return next(err);
    }
});


//update equipment
router.patch("/:id", async (req, res, next) => {
    try {
      const equipment = await EquipmentModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { ...req.body } },
        { new: true }
      );
      return res.json(equipment);
    } catch (err) {
      return next(err);
    }
  });

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await EquipmentModel.findByIdAndDelete(id);
        res.json({ message: 'Equipment deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;