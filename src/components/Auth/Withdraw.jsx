import '../Styles/Withdrawal.css'
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
const Withdraw = (props) => {
  const [amount, setAmount] = useState("");
  const [isPending, setIsPending] = useState(false);
  const {bank, accountNO, accountName} = useContext(UserContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
  }
  return ( 
    <div className="withdrawPage">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></link>
      <h1>Withdraw</h1>
      <p>Confirm account details and enter withdrawal amount (If details are incorrect, please go to the profile page)</p>
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