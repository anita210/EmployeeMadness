import { useState } from "react"

export function BoardGameCreator() {

    const [game, setGame] = useState({ name: "", maxPlayers: 0 })

    const onSubmit = async () => {

        try {
            await fetch('/api/boardgames', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(game),
            });
        }
        catch (error) {
            console.error(error);
        }

    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGame((prevGame) => ({
            ...prevGame, [name]: value,
        }))
    };

    return (
        <form className="boardGameCreator" onSubmit={onSubmit} >
            <label> Game name <input type="text" name="name" value={game.name} onChange={handleInputChange} /></label>
            <label> Max players<input type="number" name="maxPlayers" value={game.maxPlayers} onChange={handleInputChange} /></label>
            <button type="submit">Add board game</button>
        </form>
    )


}