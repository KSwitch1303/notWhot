import '../Styles/Game.css'
import { useEffect } from "react";
let pTurn = false;
const Game = (props) => {
  useEffect(() => {
    // Handle any real-time game updates here
    props.socket.on("playersUpdated", (data) => {
      props.setPlayers(data.players);
      props.setPlayedCards([]);
      props.setMarket(data.market);
      props.setPlayedCards(data.playedCards);
      pTurn = data.players[props.username].turn;
      // checkPlayedcard();
    });

    props.socket.on("startGame", (data) => {
      props.setPlayers(data.players);
      props.setMarket(data.market);
      props.setPlayedCards(data.playedCards);
      props.socket.emit("updatePlayedCards", { roomCode: props.room });
    });

    return () => {
      props.socket.off("playersUpdated");
      props.socket.off("startGame");
    };
  }, [props.socket, props.setPlayers, props.setPlayedCards, props.setMarket]);

  const playCard = (card) => {
    if (props.players[props.username].turn) {
      checkCard(card);
    }
  };

  const useMarket = () => {
    if (props.players[props.username].turn) {
      props.socket.emit("useMarket", { roomCode: props.room, username: props.username });
    }
  };

  const checkCard = (card) => {
    console.log(props.playedCards[props.playedCards.length - 1]);
    console.log(card);
    const cardShape = card.split("-")[0];
    const cardNumber = card.split("-")[1];
    const playedCardShape = props.playedCards[props.playedCards.length - 1].split("-")[0];
    const playedCardNumber = props.playedCards[props.playedCards.length - 1].split("-")[1];
    console.log(playedCardShape);
    console.log(playedCardNumber);
    console.log(cardShape);
    console.log(cardNumber);
    if (cardShape === playedCardShape || cardNumber === playedCardNumber) {
      switch (cardNumber) {
        case "2":
          props.socket.emit("playCard", { roomCode: props.room, username: props.username, card });
          props.socket.emit("pickTwo", { roomCode: props.room, username: props.username, card });
          break;
        case "8":
          props.socket.emit("playCard", { roomCode: props.room, username: props.username, card });
          props.socket.emit("suspension", { roomCode: props.room, username: props.username, card });
          break;
        case "14":
          props.socket.emit("playCard", { roomCode: props.room, username: props.username, card });
          props.socket.emit("generalMarket", { roomCode: props.room, username: props.username, card });
          break;
        case "1":
          props.socket.emit("playCard", { roomCode: props.room, username: props.username, card });
          props.socket.emit("holdOn", { roomCode: props.room, username: props.username, card });
          break;
        default:
          props.socket.emit("playCard", { roomCode: props.room, username: props.username, card });
          break;
      }
    } else {
      alert("Invalid card played, Use the market to get a card");
    }
  }

  const checkPlayedcard = () => {
    
    const playedCardShape = props.playedCards[props.playedCards.length - 1].split("-")[0];
    const playedCardNumber = props.playedCards[props.playedCards.length - 1].split("-")[1];
    if (pTurn) {
      alert(props.playedCards[props.playedCards.length - 1]);
      alert(playedCardNumber);
      if (playedCardNumber === "2") {
        
        //  alert("Pick Two");
      } 
    }
  }

  const currentPlayer = Object.values(props.players).find(player => player.turn);

  return (
    <div className="game">
      <h1>Game Room: {props.room}</h1>
      <h2>Current Turn: {currentPlayer ? currentPlayer.username : 'Waiting...'}</h2>
      
      {/* <h2>Players</h2> */}
      <div className="players">
        {Object.values(props.players).map((player) => (
          <div className="Gameplayer" key={player.username}>
            {player.username !== props.username ? (
              <div className="otherplayers">
                <h3>{player.username} {player.turn && '(Turn)'}</h3>
                {/* <p>Wager: {player.wager}</p> */}
                {player.username === props.username && <h4>Cards</h4>}
                {player.cards.map((card, index) => (
                  player.username === props.username ? (
                    <button onClick={() => playCard(card)} key={index}>{card}</button>
                  ) : null
                ))}
              </div>
            ) : null}
            
            
          </div>
        ))}
      </div>
      <div className="gameSpace">
        <div className="market">
          <img className='usemarket' onClick={useMarket} disabled={!props.players[props.username].turn} src="/WhotCards/back.png" alt="usemarket" />
          {/* <button onClick={useMarket} disabled={!props.players[props.username].turn} style={{ backgroundImage: `url(/WhotCards/back.png)`}}>Use Market</button> */}
        </div>
        
        <div className="playedCards" style={{ display: 'flex', flexWrap: 'wrap' }}>
          {/* {props.playedCards.map((card, index) => (
            <div key={index}>
              <img className='card' src={`/WhotCards/${card}.png`} alt={card} />
            </div>
          ))} */}
          <img className='card' src={`/WhotCards/${props.playedCards[props.playedCards.length - 1]}.png`} alt={props.playedCards[props.playedCards.length - 1]} />
        </div>
      </div>
      
      
      {Object.values(props.players).map((player) => (
          <div className="Gameplayer" key={player.username}>
            {player.username === props.username ? (
              <div className="me">
                {/* <h3>{player.turn && '(Current Turn)'}</h3> */}
                {player.cards.map((card, index) => (
                  player.username === props.username ? (
                    // <button onClick={() => playCard(card)} key={index}>{card}</button>
                    <img onClick={() => playCard(card)} className='card' src={`/WhotCards/${card}.png`} alt={card} key={index} />
                  ) : null
                ))}
              </div>
            ) : null}
            
            
          </div>
        ))}
      
    </div>
  );
};

export default Game;
