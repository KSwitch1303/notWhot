import '../Styles/Lobby.css';
import { useEffect } from "react";
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
    props.socket.emit("joinRoom", { lobbyName: props.lobby, username: props.username });
    // alert('Joined')
  }, [])

  useEffect(() => {
    props.socket.on("roomCode", (data) => {
      props.setRoom(data.roomCode);
    })
    props.socket.on("userJoined", (data) => {
      // alert(data.username + " joined the room");
    });

    // props.socket.on("userLeft", (data) => {
    //   alert(data.username + " left the room");
    // });

    props.socket.on("playersUpdated", (data) => {
      props.setPlayers(data.players);
    });

    props.socket.on("startGame", (data) => {
      props.setMarket(data.market);
      props.setPlayedCards(data.playedCards);
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
 