const express = require("express");
const router = express.Router();
const BoardGameModel = require("../db/boardgame.model");


router.get("/", async (req, res) => {
    try {
        const games = await BoardGameModel.find();

        return res.json(games);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get("/:id", async (req, res) => {
    const gameId = req.params.id;
    try {
        const game = await BoardGameModel.findById({_id: gameId});

        return res.json(game);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/:maxPlayers", async (req, res) => {
    const maxPlayers = req.params.maxPlayers;
    try {
        const games = await BoardGameModel.find();
        const maxGames = games.filter((game) => (game.maxPlayers <= maxPlayers))
        return res.json(maxGames);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/", async (req, res) => {
    const game = req.body;
    try {
        const saved = await BoardGameModel.create(game);
        return res.json(saved);
    } catch (err) {
        console.err(err)
    }
});

module.exports = router;