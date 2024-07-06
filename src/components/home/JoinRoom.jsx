import '../Styles/JoinRoom.css'
import { useState, useEffect } from "react";

const JoinRoom = (props) => {
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");

  const joinRoom = () => {
    props.socket.emit("joinRoom", { roomCode, username });
    props.setRoom(roomCode);
    props.setUsername(username);
    props.setPage("lobby");
  };
  useEffect(() => {
    // Handle room full error
    props.socket.on("roomFull", (data) => {
      alert(data.message); // Display an alert or handle it in your UI
    });
  
    return () => {
      props.socket.off("roomFull");
    };
  }, [props.socket]);
  
  return (
    <form onSubmit={(e) => e.preventDefault()} className="joinRoom">
      <h1>Join Room</h1>

      <input
        type="text"
        placeholder="Room Code"
        value={roomCode}
        required
        onChange={(e) => setRoomCode(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        required
        onChange={(e) => setUsername(e.target.value)}
      />
      <div className="btnContainer">
        <button onClick={joinRoom}>Join</button>

        <button onClick={() => props.setPage("home")}>Home</button>
      </div>
      
    </form>
  );
};

export default JoinRoom;
