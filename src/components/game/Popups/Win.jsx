const Win = (props) => {
  return (props.trigger) ? ( 
    <div className="winPopup">
      <div className="winPopup-inner">
        <div className="winPopup-close" onClick={() => props.setTrigger(false)}>x</div>
        <h1>{props.usename} {props.winStatus}</h1>
        {props.winStatus === 'wins' ? <img src="/WhotCards/win.svg" alt="win"/> : <img src="/WhotCards/lose.svg" alt="lose"/>}
        <button onClick={() => props.setTrigger(false)}>Close</button>
      </div>
    </div>
   ): "";
}
 
export default Win;