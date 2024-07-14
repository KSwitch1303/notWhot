import './Waiting.css'
import { useState, useRef, useEffect } from "react";
const Waiting = (props) => {
  const [timer, setTimer] = useState(60 * 5);
  let timeHandler = useRef();

  useEffect(() => {
    props.socket.on("waitTimerTicked", (data) => {
      setTimer(data.timer);
    })
  }, [props.socket]);

  

  useEffect(() => {
    timeHandler.current = setInterval(() => {
      props.socket.emit("updateWaitTimer", { roomCode: localStorage.getItem("room") });
    }, 1000);
    return () => {
      clearInterval(timeHandler.current);
    };
  }, [timer]);
  return (props.trigger) ? ( 
    <div className="waitingPopup">
      <div className="waitingPopup-inner">
        <h1>WAITING FOR opponent</h1>
        <h2>TIME LEFT: {timer}</h2>
      </div>
    </div>
   ): "";
}
 
export default Waiting;