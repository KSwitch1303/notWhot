const HomeContent = (props) => {
  return ( 
    <div className="landing">
      <h1>Welcome {props.username}</h1>
      <h1>Pick A lobby</h1>
      <button onClick={() => props.setPage("lobby")}>₦100</button>
      <button onClick={() => props.setPage("lobby")}>₦200</button>
      <button onClick={() => props.setPage("lobby")}>₦500</button>
      {/* <button onClick={() => props.setPage("createRoom")}>Create Room</button>
      <button onClick={() => props.setPage("joinRoom")}>Join Room</button> */}
    </div>
   );
}
 
export default HomeContent;