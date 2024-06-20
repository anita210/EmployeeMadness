import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom";

export function BoardGameListPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const navigate = useNavigate();
    const [boardGames, setBoardGames] = useState([]);
    const maxPlayers = queryParams.get('maxPlayers');


    /*const fetchMaxPlayerGames = async () => {
          try {
              const response = await fetch(`/api/boardgames/${maxPlayers}`);
              const data = await response.json();
              setBoardGames(data);
              console.log(data);
          }
          catch (error) {
              console.error(error);
          }
      }*/

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/boardgames');
                const data = await response.json();
                setBoardGames(data);
                console.log(data);
            }
            catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [])

    const handleButtonClick = (gameId, event) => {
        event.preventDefault()
        navigate(`/games-list/${gameId}`);
    }

    return (
        <table>
            <tbody>{maxPlayers ?
                boardGames.some((game) => game.maxPlayers <= maxPlayers) ? (
                    boardGames.map((game) => (
                        game.maxPlayers <= maxPlayers && (
                            <tr key={game._id}>
                                <td>{game.name}</td>
                                <td>{game.maxPlayers}</td>
                                <td><button onClick={(event) => handleButtonClick(game._id, event)}>Game page</button></td>
                            </tr>
                        )
                    ))
                ) : (
                    <tr>
                        <td >
                            <h2>No games</h2>
                        </td>
                    </tr>
                )
                : boardGames.map((game) => (
                    <tr key={game._id}>
                        <td>{game.name}</td>
                        <td>{game.maxPlayers}</td>
                        <td><button onClick={(event) => handleButtonClick(game._id, event)}>Game page</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}