import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

export function BoardGamePage() {
    const params = useParams();
    const [game, setGame] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/boardgames/${params.id}`);
                const data = await response.json();
                setGame(data);
                console.log(data);
            }
            catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [])

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Maximum Players</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{game.name}</td>
                    <td>{game.maxPlayers}</td>
                </tr>

            </tbody>
        </table>
    )



}