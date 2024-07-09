import './index.css';
import { useEffect, useState } from 'react';
import sound from '../../Assets/Sounds/backgroundMusic.wav'; // Use import for better path resolution
const audio = new Audio(sound);
const Navbar = (props) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  useEffect(() => {
    if (isMuted) {
      stop();
    } else {
      play();
    }
  },[isMuted])

  const play = () => {
    audio.loop = true;
    // make the loop smoother
    audio.ontimeupdate = () => {
      if (audio.currentTime > audio.duration - 0.2) {
        audio.currentTime = 0.1;
      }
    };
    audio.play()
      .then(() => {
      })
      .catch(error => {
        console.error("Error playing audio:", error);
      });
  }
  const stop = () => {
    audio.pause();
  }

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return ( 
    <div className="navbar">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></link>
      <div className="navRight">
        <h1 className="username">{props.username}</h1>
        <h1 className="balance">₦{props.balance}</h1>
      </div>

      <div className="navLeft">
        <h1 className="profile" onClick={() => props.setPage("profile")} title="Profile"><i className="fa-solid fa-user"></i></h1>
        <h1 className="topup" onClick={() => props.setPage("topup")} title="Top-up"><i className="fa-solid fa-wallet"></i></h1>
        <h1 className="withdraw" onClick={() => props.setPage("withdraw")} title="Withdraw"><i className="fa-solid fa-hand-holding-dollar"></i></h1>
        <h1 className='transactions' onClick={() => props.setPage("transactions")} title="Transactions"><i className="fa-solid fa-receipt"></i></h1>
        <h1 className="mute" onClick={() => setIsMuted(!isMuted)} title="Mute">{isMuted ? <i className="fa-solid fa-volume-xmark" onClick={() => setIsMuted(false)}></i> : <i className="fa-solid fa-volume-high" onClick={() => setIsMuted(true)}></i>}</h1>
        <h1 className="logout" onClick={() => props.setLoggedIn(false)} title="Logout"><i className="fa-solid fa-right-from-bracket"></i></h1>
      </div>

      <div className="menu-icon" onClick={toggleDropdown}>
        <i className="fa-solid fa-bars"></i>
      </div>

      <div className={`dropdown-content ${dropdownVisible ? 'show' : ''}`}>
        <h1 className="profile" onClick={() => { props.setPage("profile"); toggleDropdown(); }}><i className="fa-solid fa-user"></i> Profile</h1>
        <h1 className="topup" onClick={() => { props.setPage("topup"); toggleDropdown(); }}><i className="fa-solid fa-wallet"></i> Top-up</h1>
        <h1 className="withdraw" onClick={() => { props.setPage("withdraw"); toggleDropdown(); }}><i className="fa-solid fa-hand-holding-dollar"></i> Withdraw</h1>
        <h1 className='transactions' onClick={() => { props.setPage("transactions"); toggleDropdown(); }}><i className="fa-solid fa-receipt"></i> Transactions</h1>
        <h1 className="mute" onClick={() => { setIsMuted(!isMuted); toggleDropdown(); }}>{isMuted ? <i className="fa-solid fa-volume-xmark"></i>  : <i className="fa-solid fa-volume-high"></i>}{isMuted ? " Unmute" : " Mute"}</h1>
        <h1 className="logout" onClick={() => { props.setLoggedIn(false); toggleDropdown(); }}><i className="fa-solid fa-right-from-bracket"></i> Logout</h1>
      </div>
    </div>
  );
}

export default Navbar;
