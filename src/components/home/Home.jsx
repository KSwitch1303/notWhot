import '../Styles/Home.css'
import { useContext } from 'react';
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
import Transactions from './Transactions';
const apiUrl = process.env.REACT_APP_API_URL
const socket = io.connect(apiUrl);
const Home = () => {
  const {page, setPage, room, setRoom, players, setPlayers, market, setMarket, playedCards, setPlayedCards, lobby, setLobby} = useContext(GameContext);
  const {username, setUsername, balance, setLoggedIn} = useContext(UserContext);
  
  return ( 
    <div className="home">
      <Navbar username={username} balance={balance} setLoggedIn={setLoggedIn} setPage={setPage}/>
      <div className="homeContent">
        {page === "home" && <HomeContent setPage={setPage} username={username} setLobby={setLobby}/>}
        {page === "profile" && <Profile username={username} setPage={setPage}/>}
        {page === "topup" && <Topup username={username} setPage={setPage}/>}
        {page === "transactions" && <Transactions username={username} setPage={setPage}/>}
        {page === "createRoom" && <CreateRoom setPage={setPage} socket={socket} setRoom={setRoom} setPlayers={setPlayers} players={players} username={username} setUsername={setUsername}/>}
        {page === "joinRoom" && <JoinRoom setPage={setPage} socket={socket} setRoom={setRoom} setPlayers={setPlayers} players={players} username={username} setUsername={setUsername}/>}
        {page === "lobby" && <Lobby setPage={setPage} socket={socket} room={room} setRoom={setRoom} setPlayers={setPlayers} players={players} username={username} setMarket={setMarket} market={market} playedCards={playedCards} setPlayedCards={setPlayedCards} lobby={lobby} />}
        {page === "game" && <Game setPage={setPage} socket={socket} room={room} setRoom={setRoom} setPlayers={setPlayers} players={players} username={username} setMarket={setMarket} market={market} playedCards={playedCards} setPlayedCards={setPlayedCards} />}
      </div>
    </div>
   );
}
 
export default Home;