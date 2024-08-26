import { useEffect } from "react";
const HomeContent = (props) => {
  useEffect(() => {
    localStorage.removeItem('room')
    localStorage.removeItem('userID')
    localStorage.removeItem('pTurn')
    localStorage.removeItem('lobby')
    localStorage.removeItem('winPopup');
    localStorage.removeItem('winStatus');
    localStorage.removeItem('waitingPopup');
    localStorage.removeItem('timer');
    localStorage.removeItem('opponent');
    localStorage.removeItem('neededCard');
    localStorage.removeItem('need');
  },[])
  return ( 
    <div className="landing">
      <h1>Welcome {props.username}</h1>
      <h1>Pick A lobby</h1>
      <button onClick={() => {
        if (props.balance < 100) {
          alert("Insufficient funds redirecting to top-up page...")
          props.setPage("topup")
          return
        }
        props.setLobby("100")
        window.localStorage.setItem("lobby", "100")
        props.setPage("lobby")
      }}>₦100</button>
      <button onClick={() => {
        if (props.balance < 200) {
          alert("Insufficient funds redirecting to top-up page...")
          props.setPage("topup")
          return
        }
        props.setLobby("200")
        window.localStorage.setItem("lobby", "200")
        props.setPage("lobby")
      }}>₦200</button>
      <button onClick={() => {
        if (props.balance < 500) {
          alert("Insufficient funds redirecting to top-up page...")
          props.setPage("topup")
          return
        }
        props.setLobby("500")
        window.localStorage.setItem("lobby", "500")
        props.setPage("lobby")
      }}>₦500</button>
      <button onClick={() => {
        if (props.balance < 1000) {
          alert("Insufficient funds redirecting to top-up page...")
          props.setPage("topup")
          return
        }
        props.setLobby("1000")
        window.localStorage.setItem("lobby", "1000")
        props.setPage("lobby")
      }}>₦1000</button>
       <button onClick={() => {
        if (props.balance < 5000) {
          alert("Insufficient funds redirecting to top-up page...")
          props.setPage("topup")
          return
        }
        props.setLobby("5000")
        window.localStorage.setItem("lobby", "5000")
        props.setPage("lobby")
      }}>₦5000</button>
      {/* <button onClick={() => props.setPage("createRoom")}>Create Room</button>
      <button onClick={() => props.setPage("joinRoom")}>Join Room</button> */}
    </div>
   );
}
 
export default HomeContent;