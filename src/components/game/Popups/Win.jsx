import './Win.css'
const Win = (props) => {
  return (props.trigger) ? ( 
    <div className="winPopup">
      <div className="winPopup-inner">
        {/* <div className="winPopup-close" onClick={() => props.setTrigger(false)}>x</div> */}
        <h1>YOU {props.winStatus === 'wins' ? 'WON' : 'LOST'}</h1>
        <h1 className={props.winStatus === 'wins' ? 'wager' : 'loss'}>₦{props.winStatus === 'wins' ? props.wager - (props.wager * 0.2) : props.wager}</h1>
        {props.winStatus === 'wins' ? <img src="/win.svg" alt="win"/> : <img src="/lose.svg" alt="lose"/>}
        <button onClick={() => {
          props.setTrigger(false)
          let winStatus = props.winStatus === 'wins' ? 'win' : 'loss';
          let winAmount
          if (winStatus === 'win') {
            winAmount = props.wager - (props.wager * 0.2)
          } else {
            winAmount = props.wager
          }
          console.log(winStatus, winAmount);
          
          localStorage.setItem('lobby', '');
          localStorage.setItem('room', '');
          props.socket.emit('endGame', {
            room: props.roomCode,
            username: props.username,
            amount: winAmount,
            winStatus,
            wager: props.wager
          })
          localStorage.setItem('page', 'home');
          window.location.reload();
        }}>Exit</button>
      </div>
    </div>
   ): "";
}
 
export default Win;