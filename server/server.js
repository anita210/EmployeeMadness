require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");


//ROUTES
const equipmentRoutes = require("./routes/equipments.js");
const employeeRoutes = require("./routes/employees.js");
const toolRoutes = require("./routes/tools.js");
const kittenRoutes = require("./routes/kittens.js");
const boardgameRoutes = require("./routes/boardgames.js")
const positionsRoutes =require("./routes/positions.js")

//MODELS
const BrandModel = require("./db/brand.model");


const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use("/api/equipments", equipmentRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/tools", toolRoutes);
app.use("/api/kittens", kittenRoutes);
app.use("/api/boardgames", boardgameRoutes);
app.use("/api/positions", positionsRoutes);


app.get("/api/brands", async (req, res) => {
  try {
    const brands = await BrandModel.find();
    return res.json(brands);
  } catch (error) {
    console.error(error);
  }
})

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try http://127.0.0.1:8080/api/employees/ route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

