import './INeed.css';
const Chat = (props) => {
  const chats = ['', 'Haha', 'Calm down na', 'I dont think so', 'Are you ready', 'Oya take this one'];
  return (props.trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        <div className="popup-close" onClick={() => props.setTrigger(false)}>x</div>
        <h1>send message</h1>
        <div className="popup-buttons">
          {chats.map((chat, index) => (
            <button onClick={() => {
              props.setChat(chat);
              props.setTrigger(false);
            }}>{chat}</button>
          ))}
        </div>
      </div>
    </div>
  ) : "";
}

export default Chat;
