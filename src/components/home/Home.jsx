import '../Styles/Home.css'
import { useContext, useEffect, useState } from 'react';
import io from "socket.io-client";
import { GameContext } from '../../contexts/GameContext';
import { UserContext } from '../../contexts/UserContext';
import HomeContent from './HomeContent';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import Game from '../game/Game';
import Lobby from '../game/Lobby';
import Navbar from '../Navbar';
import Profile from '../Auth/Profile';
import Topup from '../Auth/Topup';
import Withdraw from '../Auth/Withdraw';
import axios from 'axios';
import History from '../home/History';
import Leaderboard from './LeaderBoard';
const apiUrl = process.env.REACT_APP_API_URL

const socket = io.connect(apiUrl);
const Home = () => {
  const [inGame, setInGame] = useState(false);
  const {page, setPage, room, setRoom, players, setPlayers, market, setMarket, playedCards, setPlayedCards, lobby, setLobby} = useContext(GameContext);
  const {username, setUsername, balance, setBalance, loggedIn, setLoggedIn, accountName, setAccountName, setAccountNO, setBank} = useContext(UserContext);
  const [homeStyle, setHomeStyle] = useState('homeContent');
  useEffect(() => {
    const tempLoggedIn = localStorage.getItem("loggedIn");
    if (tempLoggedIn) {
      updateUser();
    }
    if (page === "game") {
      setHomeStyle('homeContent2');
    } else {
      setHomeStyle('homeContent');
    }
    localStorage.setItem("page", page);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[page]);
  
  const updateUser = async () => {
    if (!username) {
      const tempUsername = localStorage.getItem("username");
      setUsername(localStorage.getItem("username"));
      const {data} = await axios.get(`${apiUrl}/users/${tempUsername}`);
      setBalance(data.user.balance);
      setAccountName(data.user.accountName);
      setAccountNO(data.user.accountNo);
      setBank(data.user.bank);
      setPage(localStorage.getItem("page"));
    } else {
      const {data} = await axios.get(`${apiUrl}/users/${username}`);
      setBalance(data.user.balance);
    }
    // console.log(data);
  }
  return ( 
    <div className="home">
      {page !== "game" && <Navbar username={username} balance={balance} setLoggedIn={setLoggedIn} setPage={setPage}/>}
      
      <div className={homeStyle}>
        {page === "home" && <HomeContent setPage={setPage} username={username} setLobby={setLobby} balance={balance} setBalance={setBalance}/>}
        {page === "profile" && <Profile username={username} setPage={setPage}/>}
        {page === "topup" && <Topup username={username} accountName={accountName} setPage={setPage}/>}
        {page === "withdraw" && <Withdraw username={username} setPage={setPage}/>}
        {page === "transactions" && <History username={username} setPage={setPage}/>}
        {page === "leaderboard" && <Leaderboard setPage={setPage} username={username}/>}
        {page === "createRoom" && <CreateRoom setPage={setPage} socket={socket} setRoom={setRoom} setPlayers={setPlayers} players={players} username={username} setUsername={setUsername}/>}
        {page === "joinRoom" && <JoinRoom setPage={setPage} socket={socket} setRoom={setRoom} setPlayers={setPlayers} players={players} username={username} setUsername={setUsername}/>}
        {page === "lobby" && <Lobby setPage={setPage} socket={socket} setInGame={setInGame} room={room} setRoom={setRoom} setPlayers={setPlayers} players={players} username={username} setMarket={setMarket} market={market} playedCards={playedCards} setPlayedCards={setPlayedCards} lobby={lobby} />}
        {page === "game" && <Game setPage={setPage} setLobby={setLobby} inGame={inGame} setInGame={setInGame} socket={socket} room={room} setRoom={setRoom} setPlayers={setPlayers} players={players} username={username} setMarket={setMarket} market={market} playedCards={playedCards} setPlayedCards={setPlayedCards} />}
      </div>
    </div>
   );
}
 
export default Home;