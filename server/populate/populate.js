/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");

//JSON
const names = require("./names.json");
const levels = require("./levels.json");
const colors = require("./colors.json")
const positions = require("./positions.json");
const brandsdata = require("./brands.json")
const tools = require("./tools.json");
const boardGames = require("./boardgames.json")


//MODELS
const EmployeeModel = require("../db/employee.model");
const BrandModel = require("../db/brand.model");
const ToolSchema = require("../db/tool.model");
const ToolModel = require("../db/tool.model");
const BoardGameModel = require("../db/boardgame.model");
const PositionModel = require ("../db/position.model")

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];
const getSalary = () => Math.ceil(Math.random() * (1000 - 500 + 1)) + 500;

/*startingDate: {
  type: Date
},
salary: Number,
desiredSalary: Number,
favouriteColor: String*/

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});

  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions).name,
    salary: getSalary(),
    desiredSalary: getSalary(),
    favouriteColor: pick(colors)
  }));

  await EmployeeModel.create(...employees);
  console.log("Employees created");
}

const populateTools = async () => {
  await ToolModel.deleteMany({});

  const toolsData = tools.map((tool) => ({
    name: tool.name,
    weight: tool.weight
  }))

  await ToolSchema.create(...toolsData);
  console.log("Tools created");
}

const populateBrands = async () => {
  await BrandModel.deleteMany({});
  const brands = brandsdata.map((brand) => ({
    name: brand
  }));
  await BrandModel.create(...brands);
  console.log("Brands created")
}

const populateBoardGames = async () => {
  await BoardGameModel.deleteMany({});

  const boardGameData = boardGames.map((game) => ({
    name: game.name,
    maxPlayers: game.maxPlayers
  }))

  await BoardGameModel.create(...boardGameData);
  console.log("Games created");
}

const populatePositions = async () => {
  await PositionModel.deleteMany({});

  const positionsData = positions.map((position) => ({
    name: position.name,
    salary: position.salary
  }))

  await PositionModel.create(...positionsData);
  console.log("Positions created");
}


const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEmployees();
  await populateBrands();
  await populateTools();
  await populateBoardGames();
  await populatePositions();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
