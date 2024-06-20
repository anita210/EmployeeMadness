const express = require("express");
const router = express.Router();
const EmployeeModel = require("../db/employee.model");



router.get("/", async (req, res) => {
  try {
    const employees = await EmployeeModel.find();

    return res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get by id
router.get("/:id", async (req, res) => {
  const empId = req.params.id;
  try {
    const employee = await EmployeeModel.findById({ _id: empId })
    return res.json(employee)
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})



//top 3 best paid
router.get("/top-paid", async (req, res) => {
  try {
    const employees = await EmployeeModel.find().sort({ salary: -1 }).limit(3);
    res.json(employees);
  }
  catch (error) {
    console.error(error);
  }

})

//find by years of experience
router.get("/:years", async (req, res) => {
  const searchedExp = parseInt(req.params.years)
  try {
    const employees = await EmployeeModel.find({ experience: searchedExp });
    if (employees.length !== 0) {
      return res.json(employees);
    }
    else {

      return res.json((404).json("No employee found with this many experience"))
    }
  }

  catch (error) {
    console.error(error);
  }
})

//find by name
router.get("/search/:search", async (req, res) => {
  const searchedName = req.params.search;
  const foundEmployees = await EmployeeModel.find({ name: { $regex: searchedName, $options: 'i' } })
  if (foundEmployees.length !== 0) {
    return res.json(foundEmployees);
  }
  else {
    return res.status(404).json("No employee found with this name!")
  }
});

router.post("/", async (req, res) => {
  const employee = req.body;
  try {
    if (employee.level === "Junior" && employee.experience > 0) {
      return res.status(400).json({
        error: "Junior level employees cannot have more than 0 years of experience",
      });
    }
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An unexpected error occurred. Please try again.' });
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(employee);
  } catch (err) {
    return next(err);
  }
})

router.patch("/kittens/:id", async (req, res, next) => {
  try {
    const updatedEmployee = await EmployeeModel.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { kittens: req.body.kitten } },
      { new: true }
    );

    return res.json(updatedEmployee);
  } catch (err) {
    return next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    const deleted = await employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;