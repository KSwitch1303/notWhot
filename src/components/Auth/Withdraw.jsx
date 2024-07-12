import '../Styles/Withdrawal.css'
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL
const Withdraw = (props) => {
  const [amount, setAmount] = useState("");
  const [isPending, setIsPending] = useState(false);
  const {bank, accountNO, accountName, balance, setBalance} = useContext(UserContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    if (amount < 100) {
      alert("Amount must be greater than N100");
      setIsPending(false);
    } else {
      if (amount > balance) {
        alert("Insufficient funds");
        setIsPending(false);
      } else {
        withdraw(); 
      }
    }
  }
  const withdraw = async () => {
    try {
      const response = await axios.post(`${apiUrl}/addWithdrawal`, {
        amount: amount,
        party2: props.username
      });
      const data = await response.data;
      if (data.success) {
        alert(data.message);
        // setBalance(balance - amount);
        props.setPage('transactions');
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
    <div className="withdrawPage">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></link>
      <h1>Withdraw</h1>
      <p>Confirm account details and enter withdrawal amount <br/> (If details are incorrect, please go to the profile page) <br/> Withdrawal confirmation time is between 8am-10am, 12pm-1pm and 8pm-10pm <br /> Minimum amount is N100</p>
      <h3>Account Name: {accountName}</h3>
      <h3>Account Number: {accountNO}</h3> 
      <h3>Bank: {bank}</h3>
      <form className="withdrawForm" onSubmit={handleSubmit}>
        <label htmlFor="amount">Amount</label>
        <input disabled={isPending} onChange={(e) => setAmount(e.target.value)} value={amount} type="text" placeholder="Minimum amount is N100" required />
        <button type="submit" disabled={isPending}>{isPending ? "Processing..." : "Submit"}</button>
      </form>
      <button className="home-button" onClick={() => props.setPage("home")}>Home</button>
    </div>
   );
}
 
export default Withdraw;