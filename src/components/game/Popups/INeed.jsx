import './INeed.css';
const INeed = (props) => {
  return (props.trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        <div className="popup-close" onClick={() => props.setTrigger(false)}>x</div>
        <h1>What do you need?</h1>
        <div className="popup-buttons">
          <button onClick={() => {
            props.setNeed("x");
            props.setTrigger(false);
          }}>CROSS</button>
          <button onClick={() => {
            props.setNeed("s");
            props.setTrigger(false);
          }}>SQUARE</button>
          <button onClick={() => {
            props.setNeed("t");
            props.setTrigger(false);
          }}>TRIANGLE</button>
          <button onClick={() => {
            props.setNeed("c");
            props.setTrigger(false);
          }}>CIRCLE</button>
          <button onClick={() => {
            props.setNeed("r");
            props.setTrigger(false);
          }}>STAR</button>
        </div>
      </div>
    </div>
  ) : "";
}

export default INeed;
