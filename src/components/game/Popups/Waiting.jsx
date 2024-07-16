import './Waiting.css'
import { useState, useRef, useEffect } from "react";
const Waiting = (props) => {
  const [timer, setTimer] = useState(180);
  let timeHandler = useRef();

  useEffect(() => {
    props.socket.on("waitTimerTicked", (data) => {
      setTimer(data.timer);
      console.log(data.timer);
    })
  }, [props.socket]);

  const timerTick = () => {
    timeHandler.current = setInterval(() => {
      
      props.socket.emit("updateWaitTimer", { roomCode: localStorage.getItem("room"), username: localStorage.getItem("username") });  
      
    }, 1000)
  };
  
  

  useEffect(() => {
    if (props.trigger) {
      timerTick();
    }
    
    
    return () => {
      clearInterval(timeHandler.current);
      props.socket.off("updateWaitTimer");
    };
  }, [props.trigger]);
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