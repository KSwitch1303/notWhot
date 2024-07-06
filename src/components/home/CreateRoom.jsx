import '../Styles/CreateRoom.css'
import { useState } from "react";

const CreateRoom = (props) => {
  const [username, setUsername] = useState("");

  const createRoom = () => {
    const roomCode = generateRoomCode();
    const newPlayer = {
      username: username,
      cards: [],
      wager: 100,
      status: "waiting",
    };

    // Emit the createRoom event to the server
    props.socket.emit("createRoom", { roomCode, username });

    // Update local state
    props.setRoom(roomCode);
    props.setUsername(username);
    props.setPlayers({ [username]: newPlayer });
    props.setPage("lobby");

    // Send the updated player list to the server
    props.socket.emit("updatePlayers", { roomCode, players: { [username]: newPlayer } });
  };

  const generateRoomCode = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="createRoom">
      <h1>Create Room</h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        required
        onChange={(e) => setUsername(e.target.value)}
      />
      <div className="btnContainer">
        <button onClick={createRoom}>Create</button>

        <button onClick={() => props.setPage("home")}>Home</button>
      </div>
      
    </form>
  );
};

export default CreateRoom;
