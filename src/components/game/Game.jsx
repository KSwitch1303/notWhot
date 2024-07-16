import '../Styles/Game.css'
import { useEffect, useRef, useState } from "react";
import Sound from '../../Assets/Sounds/playCard.wav';
import Sound2 from '../../Assets/Sounds/useMarket.wav';
import INeed from './Popups/INeed';
import Win from './Popups/Win';
import Waiting from './Popups/Waiting';
import Chat from './Popups/Chat';


let pTurn = false;
const Game = (props) => {
  const userID  = localStorage.getItem("userID") || props.socket.id;
  const [specialCardUsed , setSpecialCardUsed] = useState('');
  const [needPopup, setNeedPopup] = useState(false);
  const [need, setNeed] = useState(localStorage.getItem("need") || '');
  const [neededCard, setNeededCard] = useState(localStorage.getItem("neededCard") || '');
  const [winStatus, setWinStatus] = useState(localStorage.getItem("winStatus") || '');
  const [winPopup, setWinPopup] = useState(localStorage.getItem("winPopup") || false);
  const [chatPopup, setChatPopup] = useState(false);
  const [chat, setChat] = useState('');
  const [opponentChat, setOpponentChat] = useState('');
  const [waitingPopup, setWaitingPopup] = useState(localStorage.getItem("waitingPopup") || false);
  const [opponent, setOpponent] = useState('');
  const [needType, setNeedType] = useState('');

  const [timer, setTimer] = useState(30);
  let timeHandler = useRef();
  const cardFullname = {
    't': "TRIANGLE",
    's': "SQUARE",
    'x': "CROSS",
    'c': "CIRCLE",
    'r': "STAR"
  }
  useEffect(() => {
    localStorage.setItem("userID", userID);
  }, [userID]);
  useEffect(() => {
      props.socket.emit("chat", { roomCode: localStorage.getItem("room"), username: props.username, chat: chat });
  },[chat])
  useEffect(() => {
    if (need !== '') {
      setSpecialCardUsed('I need');
      props.socket.emit("playCard", { roomCode: localStorage.getItem("room"), username: props.username, card: needType, need: need });
      setNeed('');
      localStorage.setItem("need", '');
      playSound();
    }
    localStorage.setItem("need", need);
  },[need])
  const timerTick = () => {
    timeHandler.current = setInterval(() => {
      
      

        // props.socket.emit("updateTimer", { roomCode: localStorage.getItem("room"), username: localStorage.getItem("username") });
        if (!winStatus) {
          if (neededCard) {
            console.log('need', neededCard);
            if (localStorage.getItem("waitingPopup") == 'true') {
              // console.log('waiting');
            }
            props.socket.emit("updateTimer", { roomCode: localStorage.getItem("room"), username: localStorage.getItem("username"), need: neededCard });
          }
          else {
            if (localStorage.getItem("waitingPopup") == 'true') {
              // console.log('waiting');
              return
            }
            // console.log('no need');
            props.socket.emit("updateTimer", { roomCode: localStorage.getItem("room"), username: localStorage.getItem("username") });
          }
        }      
        
    }, 1000)
  };
  useEffect(() => {
      timerTick();
    
      
    

    return () => {
      clearInterval(timeHandler.current);
      props.socket.off("updateTimer");
    }
  },[])
  useEffect(() => {
    // Handle any real-time game updates here
    props.socket.on("waitingOnUser", (data) => {
      if (winPopup) {
        return
      }
      setOpponent(data.usersname);
      // localStorage.setItem("opponentID", opponentID);
      // alert('waiting for ' + data.usersname);
      setWaitingPopup(true);
      localStorage.setItem("waitingPopup", true);
    })
    props.socket.on("receiveChat", (data) => {
      if (data.username !== props.username) {
        setOpponentChat(data.chat);
      }
    })

    props.socket.on("playersRejoined", (data) => {
      if (data.username === localStorage.getItem("username") && localStorage.getItem("waitingPopup") == 'true') {
        // alert('players rejoined');
        setWaitingPopup(true);
        props.setPlayers(data.players);
        props.setPlayedCards([]);
        props.setMarket(data.market);
        props.setPlayedCards(data.playedCards);
        setNeededCard(localStorage.getItem("neededCard"));
        localStorage.setItem("userID", data.userID);
        return
      }
      setWaitingPopup(false);
      localStorage.removeItem("waitingPopup");
      props.socket.emit("resetWaitTimer", { roomCode: localStorage.getItem("room"), username: localStorage.getItem("username") });
      props.setPlayers(data.players);
      props.setPlayedCards([]);
      props.setMarket(data.market);
      props.setPlayedCards(data.playedCards);
      setNeededCard(localStorage.getItem("neededCard"));
      localStorage.setItem("userID", data.userID);
      // console.log(data.players[props.username].turn);
      let tempUsername = localStorage.getItem("username");
      console.log('data',data.players);
      // alert(data.players[tempUsername].turn);
      // pTurn = data.players[tempUsername].turn;
      // console.logs(pTurn);
      // localStorage.setItem("pTurn", pTurn);
      playSound();
      if (data.cardNeeded) {
        // setNeededCard(data.need);
      } else {
        // setNeededCard('');
      }
      // alert(data.playedCards.length -1)
      // checkPlayedcard(data.playedCards[data.playedCards.length - 1].split("-")[0], data.playedCards[data.playedCards.length - 1].split("-")[1], data.normalCardPlayed);
    })
    props.socket.on("playersUpdated", (data) => {
      props.setPlayers(data.players);
      props.setPlayedCards([]);
      props.setMarket(data.market);
      props.setPlayedCards(data.playedCards);
      // console.log(data.players[props.username].turn);
      let tempUsername = localStorage.getItem("username");
      console.log('data',data.players);
      // alert(data.players[tempUsername].turn);
      pTurn = data.players[tempUsername].turn;
      // console.logs(pTurn);
      localStorage.setItem("pTurn", pTurn);
      playSound();
      if (data.cardNeeded) {
        setNeededCard(data.need);
        localStorage.setItem("neededCard", data.need);
      } else {
        setNeededCard('');
        localStorage.setItem("neededCard", '');
      }
      // alert(data.playedCards.length -1)
      checkPlayedcard(data.playedCards[data.playedCards.length - 1].split("-")[0], data.playedCards[data.playedCards.length - 1].split("-")[1], data.normalCardPlayed);
    });

    props.socket.on("startGame", (data) => {
      props.setPlayers(data.players);
      props.setMarket(data.market);
      props.setPlayedCards(data.playedCards);
      props.setInGame(true);
      props.socket.emit("updatePlayedCards", { roomCode: props.room });
    });

    props.socket.on("gameWon", (data) => {
      setWaitingPopup(false);
      localStorage.removeItem('waitingPopup');
      setWinStatus(data.players[localStorage.getItem("username")].status);
      setWinPopup(true);
      localStorage.setItem('winPopup', true);
      localStorage.setItem('winStatus', data.players[localStorage.getItem("username")].status);
    })

    props.socket.on("leaveGame", (data) => {
      props.setPlayers([]);
      props.setMarket([]);
      props.setPlayedCards([]);
      // props.setRoomCode('');
      setWinPopup(false);
      setWinStatus('');
      localStorage.removeItem('lobby');
      localStorage.removeItem('room');
      localStorage.removeItem('page');
      localStorage.removeItem('pTurn');
      localStorage.removeItem('neededCard');
      localStorage.removeItem('winPopup');
      localStorage.removeItem('winStatus');
      localStorage.setItem('page', 'home');
      window.location.reload();
    })

    props.socket.on("disconnectPlayer", () => {
      props.setPlayers([]);
      props.setMarket([]);
      props.setPlayedCards([]);
      // props.setRoomCode('');
      setWinPopup(false);
      setWinStatus('');
      localStorage.setItem('lobby', '');
      localStorage.setItem('room', '');
      localStorage.setItem('page', 'home');
      localStorage.setItem('pTurn', '');
      props.setPage('home');
      window.location.reload();
    })

    props.socket.on("reconnected", (data) => {
      // alert('reconnected');
      if (localStorage.getItem("waitingPopup")) {
        props.setInGame(true);
        props.setPlayers(data.players);
        props.setMarket(data.market);
        // alert(data.market);
        props.setPlayedCards(data.playedCards);
        props.setRoom(data.room);
        props.setLobby(localStorage.getItem("lobby"));
        pTurn = localStorage.getItem("pTurn");
        return
      }
      setWaitingPopup(false);
      localStorage.removeItem("waitingPopup");
      
      props.setInGame(true);
      props.setPlayers(data.players);
      props.setMarket(data.market);
      // alert(data.market);
      props.setPlayedCards(data.playedCards);
      props.setRoom(data.room);
      props.setLobby(localStorage.getItem("lobby"));
      pTurn = localStorage.getItem("pTurn");
      props.socket.emit("updatePlayedCards", { roomCode: localStorage.getItem("room"), userID: localStorage.getItem("userID"), username: localStorage.getItem("username") });
    })
    const handleTimerTicked = (data) => {
      setTimer(data.timer);
    };
    props.socket.on("timerTicked", handleTimerTicked);
    return () => {
      props.socket.off("playersUpdated");
      props.socket.off("startGame");
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.socket, props.setPlayers, props.setPlayedCards, props.setMarket]);

  useEffect(() => {
    let tempUsername = localStorage.getItem("username");
    if (!props.inGame) {
      props.socket.emit("reconnect", { username: tempUsername });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[props.inGame]);
  

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
        props.socket.emit("useMarket", { roomCode: localStorage.getItem("room"), username: props.username, need: neededCard });  
      } else{
        props.socket.emit("useMarket", { roomCode: localStorage.getItem("room"), username: props.username });
      }
      setChat('');

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
    // console.log(props.playedCards[props.playedCards.length - 1]);
    // console.log(card);
    const cardShape = card.split("-")[0];
    const cardNumber = card.split("-")[1];
    
    // console.log(cardShape);
    // console.log(cardNumber);
    if (cardShape === neededCard) {
      props.socket.emit("playCard", { roomCode: localStorage.getItem("room"), username: localStorage.getItem("username"), card });
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
    // console.log(props.playedCards[props.playedCards.length - 1]);
    // console.log(card);
    const cardShape = card.split("-")[0];
    const cardNumber = card.split("-")[1];
    const playedCardShape = props.playedCards[props.playedCards.length - 1].split("-")[0];
    const playedCardNumber = props.playedCards[props.playedCards.length - 1].split("-")[1];
    // console.log(playedCardShape);
    // console.log(playedCardNumber);
    // console.log(cardShape);
    // console.log(cardNumber);
    if (cardShape === playedCardShape || cardNumber === playedCardNumber) {
      props.socket.emit("playCard", { roomCode: localStorage.getItem("room"), username: localStorage.getItem("username"), card });
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
        const roomCode = localStorage.getItem("room");
        const username = localStorage.getItem("username");
        switch (playedCardNumber) {
          case "2":
            await props.socket.emit("pickTwo", { roomCode, username });
            // alert("Pick Two");
            setSpecialCardUsed("Pick Two");
            
            playSound2();
            
            break;
          case "8":
            // alert("Suspension");
            props.socket.emit("holdOn", { roomCode, username });
            setSpecialCardUsed("Suspension");
            break;
          case "14":
            // alert("General Market");
            playSound2();
            props.socket.emit("generalMarket", { roomCode, username });
            setSpecialCardUsed("General Market");
            break;
          case "1":
            await props.socket.emit("holdOn", { roomCode , username });
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
      {props.inGame && (
        <div>
          
      
      {/* <h2>Players</h2> */}
      {Object.values(props.players).map((player) => (
        <div className="dasd" key={player.username}>
           {player.username !== props.username ? (
            <div className="Gameplayer" key={player.username} onClick={() => {
              setChatPopup(true);
            }} >
              <div className="otherplayers">
                <h3>Opponent: {player.username}</h3>
                <h3>Cards: {player.cards.length}</h3>
                <p>Tap to chat</p>
                <p>You: {chat}</p>
                <p>Opponent: {opponentChat}</p>
              </div>
            </div>
          ) : null}
        </div>
       
        )
      )}
      <h2>{specialCardUsed} {cardFullname[neededCard]}</h2>
      <h2>TIme: {timer}</h2>
      <h2 className={currentPlayer.username === localStorage.getItem("username") ? 'green' : 'red'}>{currentPlayer.username === localStorage.getItem("username") ? 'Your Turn' : 'Opponent Turn'}</h2>
    
      <div className="gameSpace">
        <div className="market">
          <img className='usemarket' onClick={useMarket} disabled={!props.players[props.username].turn} src="/WhotCards/back.png" alt="usemarket" />
          {/* <button onClick={useMarket} disabled={!props.players[props.username].turn} style={{ backgroundImage: `url(/WhotCards/back.png)`}}>Use Market</button> */}
        </div>
        
        <div className="playedCards" style={{ display: 'flex', flexWrap: 'wrap' }}>
          <img className='card' src={`/WhotCards/${props.playedCards[props.playedCards.length - 1]}.png`} alt={props.playedCards[props.playedCards.length - 1]} />
        </div>
      </div>
      
      <div className="myGameplayer">
        <div className="me">
          {props.players[props.username].cards.map((card, index) => (
            <img onClick={() => playCard(card)} className='card' src={`/WhotCards/${card}.png`} alt={card} key={index} />
          ))}
        </div>
      </div> 
     
      <INeed trigger={needPopup} setTrigger={setNeedPopup} need={need} setNeed={setNeed}  socket={props.socket} room={props.room} username={props.username} />
      <Win socket={props.socket} trigger={winPopup} setTrigger={setWinPopup} roomCode={props.room} username={props.username} winStatus={winStatus} wager={props.players[props.username].wager} />
      <Chat socket={props.socket} room={props.room} username={props.username} trigger={chatPopup} setTrigger={setChatPopup} setChat={setChat} />
      <Waiting socket={props.socket} trigger={waitingPopup} setTrigger={setWaitingPopup} opponent={opponent} />
        </div>
      )}
      {/* <h1>Game Room: {props.room}</h1> */}
      
    </div>
  );
};

export default Game;
