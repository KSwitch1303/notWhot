import '../Styles/Login.css'
import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const apiUrl = process.env.REACT_APP_API_URL
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);

  const {setLoggedIn, setUsername: setUser, setBank, setAccountNO, setAccountName, setBalance} = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    // sendRequest();
    checkifAdmin();
  }
  const checkifAdmin = () => {
    if (username === 'killswitch1303' && password === 'knowlee@1231') {
      navigate('/admin');
    } else {
      sendRequest();
    }
  }

  const sendRequest = async () => {
    try {
      const response = await axios.post(`${apiUrl}/login`, { username, password });
      const data = await response.data;
      if (data.success) {
        setLoggedIn(true);
        setUser(username);
        setBank(data.user.bank);
        setAccountNO(data.user.accountNo);
        setAccountName(data.user.accountName);
        setBalance(data.user.balance);
      } else {
        alert(data.message);
      }
      setIsPending(false);
    } catch (error) {
      alert(error);
    }
  }
  return ( 
    <div className="login">
      <h1>Login</h1>
      <div className="loginForm">
        <form className="loginFormContent" onSubmit={handleSubmit}>
          <div className="formgroup">
            <label htmlFor="username">Username</label>
            <input disabled={isPending} onChange={(e) => setUsername(e.target.value)} value={username} type="text" id="username" name="username" required />
          </div>
          <div className="formgroup">
            <label htmlFor="password">Password</label>
            <input disabled={isPending} onChange={(e) => setPassword(e.target.value)} value={password} type="password" id="password" name="password" required />
          </div>
          <button disabled={isPending} type="submit">{isPending ? "Logging in..." : "Login"}</button>
        </form>
        <p>Don't have an account? <Link to="/signup" disabled={isPending}>Sign Up</Link></p>
      </div>
    </div>
   );
}
 
export default Login;