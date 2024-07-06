import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GameContext } from "./contexts/GameContext";
import { UserContext } from "./contexts/UserContext";
import Home from "./components/home/Home";
import LandingPage from "./components/home/LandingPage";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
function App() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [bank, setBank] = useState("");
  const [accountNO, setAccountNO] = useState("");
  const [accountName, setAccountName] = useState("");
  const [balance, setBalance] = useState(0);


  const [connected, setConnected] = useState(false);
  
  const [page, setPage] = useState("home");
  const [room, setRoom] = useState("");
  const [players, setPlayers] = useState({});
  
  const [market, setMarket] = useState([]);
  const [playedCards, setPlayedCards] = useState([]);

  useEffect(() => {
    if (!loggedIn) navigate("/");
    if (loggedIn) navigate("/notWhot");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);
  return (
    <UserContext.Provider value={{loggedIn, setLoggedIn, username, setUsername, bank, setBank, accountNO, setAccountNO, accountName, setAccountName, balance, setBalance}}>
      <GameContext.Provider value={{connected, setConnected, room, setRoom, players, setPlayers, page, setPage, username, setUsername, market, setMarket, playedCards, setPlayedCards}}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/notWhot" element={<Home />} />
        </Routes>
      </GameContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
