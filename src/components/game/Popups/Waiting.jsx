import './Waiting.css'
import { useState, useRef, useEffect } from "react";
const Waiting = (props) => {
  const [timer, setTimer] = useState(60 * 5);
  let timeHandler = useRef();

  // useEffect(() => {
  //   props.socket.on("updateWaitTimer", (data) => {
  //     setTimer(data.timer);
  //   })
  // }, [props.socket]);

  // const Ti

  // useEffect(() => {
  //   timeHandler.current = setInterval(() => {
  //     props.socket.emit("updateWaitTimer", { roomCode: localStorage.getItem("room") });
  //   }, 1000);
  //   return () => {
  //     clearInterval(timeHandler.current);
  //   };
  // }, [timer]);
  return (props.trigger) ? ( 
    <div className="waitingPopup">
      <div className="waitingPopup-inner">
        <h1>WAITING FOR {props.opponent}</h1>
        {/* <h2>TIME LEFT: {timer}</h2> */}
      </div>
    </div>
   ): "";
}
 
export default Waiting;