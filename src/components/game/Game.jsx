import '../Styles/Game.css'
import { useEffect, useState } from "react";
import Sound from '../../Assets/Sounds/playCard.wav';
import Sound2 from '../../Assets/Sounds/useMarket.wav';
import INeed from './Popups/INeed';
let pTurn = false;
const Game = (props) => {
  const [specialCardUsed , setSpecialCardUsed] = useState('');
  const [needPopup, setNeedPopup] = useState(false);
  const [need, setNeed] = useState('');
  const [neededCard, setNeededCard] = useState('');
  const [needType, setNeedType] = useState('');
  const cardFullname = {
    't': "TRIANGLE",
    's': "SQUARE",
    'x': "CROSS",
    'c': "CIRCLE",
    'r': "STAR"
  }
  useEffect(() => {
    if (need !== '') {
      setSpecialCardUsed('I need');
      props.socket.emit("playCard", { roomCode: props.room, username: props.username, card: needType, need: need });
      setNeed('');
      playSound();
    }
  },[need])
  useEffect(() => {
    // Handle any real-time game updates here
    props.socket.on("playersUpdated", (data) => {
      props.setPlayers(data.players);
      props.setPlayedCards([]);
      props.setMarket(data.market);
      props.setPlayedCards(data.playedCards);
      pTurn = data.players[props.username].turn;
      playSound();
      if (data.cardNeeded) {
        setNeededCard(data.need);
      } else {
        setNeededCard('');
      }
      // alert(data.playedCards.length -1)
      checkPlayedcard(data.playedCards[data.playedCards.length - 1].split("-")[0], data.playedCards[data.playedCards.length - 1].split("-")[1], data.normalCardPlayed);
    });

    props.socket.on("startGame", (data) => {
      props.setPlayers(data.players);
      props.setMarket(data.market);
      props.setPlayedCards(data.playedCards);
      props.socket.emit("updatePlayedCards", { roomCode: props.room });
    });

    props.socket.on("gameWon", (data) => {
      alert(data.winner + " won the game");
    })

    return () => {
      props.socket.off("playersUpdated");
      props.socket.off("startGame");
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.socket, props.setPlayers, props.setPlayedCards, props.setMarket]);

  const playCard = (card) => {
    if (props.players[props.username].turn) {
      if (neededCard) {
        checkNeededCard(card);
      } else {
        checkCard(card);
      }
    }
  };

  const useMarket = () => {
    if (props.players[props.username].turn) {
      if (neededCard) {
        props.socket.emit("useMarket", { roomCode: props.room, username: props.username, need: neededCard });  
      } else{
        props.socket.emit("useMarket", { roomCode: props.room, username: props.username });
      }

      playSound2();
    }
  };

  const playSound = () => {
    const audio = new Audio(Sound);
    audio.play();
  }

  const playSound2 = () => {
    const audio = new Audio(Sound2);
    audio.play();
  }

  const checkNeededCard = (card) => {
    console.log(props.playedCards[props.playedCards.length - 1]);
    console.log(card);
    const cardShape = card.split("-")[0];
    const cardNumber = card.split("-")[1];
    
    console.log(cardShape);
    console.log(cardNumber);
    if (cardShape === neededCard) {
      props.socket.emit("playCard", { roomCode: props.room, username: props.username, card });
      setSpecialCardUsed('');
      playSound();
    } else if (cardShape === "w") {
      setNeedType(cardShape + "-" + cardNumber);
      setNeedPopup(true);
    } else {
      alert("Invalid card played, Use the market to get a card");
    }
  }

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
      props.socket.emit("playCard", { roomCode: props.room, username: props.username, card });
      setSpecialCardUsed('');
      playSound();
    } else if (cardShape === "w") {
      // alert("I need")
      setNeedType(cardShape + "-" + cardNumber);
      setNeedPopup(true);
    } else {
      alert("Invalid card played, Use the market to get a card");
    }
  }

  const checkPlayedcard = async (playedCardShape, playedCardNumber, normalCardPlayed) => {
    
    // let playedCardShape = props.playedCards[props.playedCards.length - 1].split("-")[0];
    // let playedCardNumber = props.playedCards[props.playedCards.length - 1].split("-")[1];
    if (pTurn) {
      // alert(playedCardShape);
      // alert(playedCardNumber);
      // alert(normalCardPlayed)
      if (normalCardPlayed) {
        switch (playedCardNumber) {
          case "2":
            await props.socket.emit("pickTwo", { roomCode: props.room, username: props.username });
            // alert("Pick Two");
            setSpecialCardUsed("Pick Two");
            
            playSound2();
            
            break;
          case "8":
            // alert("Suspension");
            props.socket.emit("holdOn", { roomCode: props.room, username: props.username });
            setSpecialCardUsed("Suspension");
            break;
          case "14":
            // alert("General Market");
            playSound2();
            props.socket.emit("generalMarket", { roomCode: props.room, username: props.username });
            setSpecialCardUsed("General Market");
            break;
          case "1":
            await props.socket.emit("holdOn", { roomCode: props.room, username: props.username });
            setSpecialCardUsed("Hold On");
            // alert("Hold On");
            break;
          case "20":
            setSpecialCardUsed("I need");
            // alert("I need");
            break;
          default:
            setSpecialCardUsed('');
            // props.socket.emit("pickTwo", { roomCode: props.room, username: props.username });
            break;
        }
      } else {
        setSpecialCardUsed('');
        if (playedCardShape === "w") {
          setSpecialCardUsed('I need');
          // alert("I need");
        }
        
      }
      
      // if (playedCardNumber === "2") {
      //    alert("Pick Two");
      // } else
    }
  }

  const currentPlayer = Object.values(props.players).find(player => player.turn);

  return (
    <div className="game">
      {/* <h1>Game Room: {props.room}</h1> */}
      <h2>Current Turn: {currentPlayer ? currentPlayer.username : 'Waiting...'}</h2>
      
      {/* <h2>Players</h2> */}
      {Object.values(props.players).map((player) => (
        <div className="dasd" key={player.username}>
           {player.username !== props.username ? (
            <div className="Gameplayer" key={player.username}>
              <div className="otherplayers">
                <h3>Opponent: {player.username} {player.turn && '(Turn)'}</h3>
                <h3>Cards: {player.cards.length}</h3>
              </div>
            </div>
          ) : null}
        </div>
       
        )
      )}
      <h2>{specialCardUsed} {cardFullname[neededCard]}</h2>
     
    
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
      
      <div className="Gameplayer">
        <div className="me">
          {props.players[props.username].cards.map((card, index) => (
            <img onClick={() => playCard(card)} className='card' src={`/WhotCards/${card}.png`} alt={card} key={index} />
          ))}
        </div>
      </div> 
     
      <INeed trigger={needPopup} setTrigger={setNeedPopup} need={need} setNeed={setNeed}  socket={props.socket} room={props.room} username={props.username} />
    </div>
  );
};

export default Game;
