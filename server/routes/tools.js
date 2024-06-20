const express = require("express");
const router = express.Router();
const ToolModel = require("../db/tool.model");

router.get("/", async (req, res) => {
    try {
        const tools = await ToolModel.find();
        return res.json(tools)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.post("/", async (req, res) => {
    const tool = req.body;
    try {
        const newTool = await ToolModel.create(tool);
        res.send(tool);
    }
    catch (error) {
        return next(error);
    }
})

module.exports = router;