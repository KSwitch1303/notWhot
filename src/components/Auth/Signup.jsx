import '../Styles/Signup.css'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;
const Signup = () => {
  const navigate = useNavigate();

  const [fusername, setfUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fbank, setfBank] = useState("");
  const [faccountNO, setfAccountNO] = useState("");
  const [faccountName, setfAccountName] = useState("");
  const [isPending, setIsPending] = useState(false);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    if (checkifPasswordMatch()) {
      sendRequest();
    } else {
      alert('Passwords do not match');
      setIsPending(false);
    }
  }

  const checkifPasswordMatch = () => {
    if (password === confirmPassword) {
      return true;
    } else {
      return false;
    }
  }

  const sendRequest = async () => {
    const res = await axios
      .post(`${apiUrl}/signup`, {
        username: fusername.trim(),
        password,
        bank: fbank.trim(),
        accountNo: faccountNO.trim(),
        accountName: faccountName.trim(),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    if (data.success) {
      alert(data.message);
      navigate('/login');
      return data;
    } else {
      alert(data.message);
      setIsPending(false);
      return data;
    }
  }
  return ( 
    <div className="signup">
      <div className="signupContent">
        <h1>Sign Up</h1>
        <div className="signupForm">
          <form className="signupFormContent" onSubmit={handleSubmit}>
            <div className="formgroup">
              <label htmlFor="username">Username<span>*</span></label>
              <input disabled={isPending} onChange={(e) => setfUsername(e.target.value)} value={fusername} type="text" id="username" name="username" required />
            </div>
            <div className="formgroup">
              <label htmlFor="password">Password<span>*</span></label>
              <input disabled={isPending} onChange={(e) => setPassword(e.target.value)} value={password} type="password" id="password" name="password" required />
            </div>
            <div className="formgroup">
              <label htmlFor="confirmPassword">Confirm Password<span>*</span></label>
              <input disabled={isPending} onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} type="password" id="confirmPassword" name="confirmPassword" required />
            </div>
            <div className="formgroup">
              <label htmlFor="bank">Bank<span>*</span></label>
              <input disabled={isPending} onChange={(e) => setfBank(e.target.value)} value={fbank} type="text" id="bank" name="bank" required />
            </div>
            <div className="formgroup">
              <label htmlFor="accountNO">Account Number<span>*</span></label>
              <input disabled={isPending} onChange={(e) => setfAccountNO(e.target.value)} value={faccountNO} type="text" id="accountNO" name="accountNO" required />
            </div>
            <div className="formgroup">
              <label htmlFor="accountName">Account Name<span>*</span></label>
              <input disabled={isPending} onChange={(e) => setfAccountName(e.target.value)} value={faccountName} type="text" id="accountName" name="accountName" required />
            </div>
            
            <button type="submit" disabled={isPending}>{isPending ? "Signing up..." : "Sign Up"}</button>
          </form>
          <p>Already have an account? <Link to="/login" disabled={isPending}>Login</Link></p>
        </div>
      </div>
    </div>
   );
}
 
export default Signup;