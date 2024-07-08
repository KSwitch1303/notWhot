import '../Styles/Topup.css'
import { useState } from "react";
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL
const Topup = (props) => {
  const [amount, setAmount] = useState("");
  const [tno, setTno] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    sendRequest();
  }

  const sendRequest = async () => {
    try {
      const response = await axios.post(`${apiUrl}/addTransaction`, {
        sender: props.username,
        amount: amount,
        tno: tno,
        receiver: "Misongo Ebimietei Favour"
      });
      const data = await response.data;
      if (data.success) {
        alert(data.message);
      } else {
        alert(data.message);
      }
      setIsPending(false);
    } catch (error) {
      alert(error);
      setIsPending(false);
    }
  }

  return ( 
    <div className="topupPage">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></link>
      <h1>Top up</h1>
      <p>Make Payment to the account below, your in game account will be credited within an hour</p>
      <h3>Account Name: Misongo Ebimietei Favour</h3>
      <h3>Account Number: 8138267700 <span><i className="fa-solid fa-copy" onClick={
        () => {
          navigator.clipboard.writeText("8138267700")
          alert("Copied!")
        }
      }></i></span></h3> 
      <h3>Bank: Opay</h3>
      <form className="topupForm" onSubmit={handleSubmit}>
        <input disabled={isPending} onChange={(e) => setAmount(e.target.value)} value={amount} type="text" placeholder="Enter Amount Paid" required />
        <input disabled={isPending} onChange={(e) => setTno(e.target.value)} value={tno} type="text" placeholder="Enter Transaction Number" required />
        <button type="submit" disabled={isPending}>{isPending ? "Processing..." : "Submit"}</button>
      </form>
      <button className="home-button" onClick={() => props.setPage("home")}>Home</button>
    </div>
  );
}
 
export default Topup;
