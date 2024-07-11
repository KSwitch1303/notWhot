import '../Styles/Lobby.css';
import { useEffect } from "react";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL
const Lobby = (props) => {
  
  const leaveRoom = () => {
    props.socket.emit("leaveRoom", { roomCode: props.room, username: props.username });
    props.setPage("home");
    // window.location.reload();
  };

  const ready = () => {
    props.socket.emit("ready", { roomCode: props.room, username: props.username });
  };

  useEffect(() => {
    const tempUsername = localStorage.getItem("username");
    const tempLobby = localStorage.getItem("lobby");
    props.socket.emit("joinRoom", { lobbyName: tempLobby, username: tempUsername });
    // alert('Joined')
  }, [])

  useEffect(() => {
    props.socket.on("roomCode", (data) => {
      props.setRoom(data.roomCode);
    })
    props.socket.on("userJoined", (data) => {
      // alert(data.username + " joined the room");
    });

    props.socket.on("userLeft", (data) => {
      alert(data.username + " left the room");
      props.setPage("home");
    });

    props.socket.on("playersUpdated", (data) => {
      props.setPlayers(data.players);
    });

    props.socket.on("startGame", async (data) => {
      props.setMarket(data.market);
      props.setPlayedCards(data.playedCards);
      const response = await axios.post(`${apiUrl}/placeBet`, { roomCode: props.room, username: props.username, amount: props.lobby });
      alert(response.data.message);
      props.setInGame(true);
      props.setPage("game");
    });

    props.socket.on("yourCards", (data) => {
      props.setPlayerCards(data.cards);
    });

    return () => { 
      props.socket.off("userJoined");
      props.socket.off("userLeft");
      props.socket.off("playersUpdated");
      props.socket.off("startGame");
      props.socket.off("yourCards");
    };
  }, [props.socket, props.setPlayers, props.setMarket, props.setPage, props.setPlayerCards]);

  return (
    <div className="lobby">
      {/* <h1>Lobby {props.room}</h1> */}
      <button className='leaveBtn' onClick={leaveRoom}>Leave Room</button>
      <div className="playerCard">
        {Object.values(props.players).map((player) => (
          <div className="player" key={player.username}>
            <h2>{player.username}</h2>
            <p>Wager: {player.wager}</p>
            <p>Status: {player.status}</p>
          </div>
        ))}
      </div>
      
      <button className='readyBtn' onClick={ready}>Ready</button>
    </div>
  );
};

export default Lobby;
 