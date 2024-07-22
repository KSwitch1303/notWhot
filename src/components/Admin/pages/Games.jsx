import { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;
const Games = (props) => {
  const [transactions, setTransactions] = useState([]);
  const [isPending, setIsPending] = useState(false);
  useEffect(() => {
    getGames();
  }, []);
  const getGames = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getGames`);
      if (response.data.success) {
        const unSortedTransactions = response.data.transactions;
        const transactions = unSortedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
        setTransactions(transactions);
      } else {
        console.error("Failed to fetch games");
      }
    } catch (error) {
      console.error(error);
    }
  }
  const forceEnd = async (transactionId) => {
    setIsPending(true);
    try {
      const response = await axios.post(`${apiUrl}/forceEndGame`, { transactionId });
      if (response.data.success) {
        console.log(response.data.message);
      } else {
        console.error("Failed to force end game");
      }
    } catch (error) {
      console.error(error);
    }
    getGames();
    setIsPending(false);
  }
  return ( 
    <div className="games">
      <h1>Games</h1>
      <button onClick={() => props.setPage("home")}>Home</button>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Players</th>
            <th>Room</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th> 
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.date.slice(0, 10)}</td>
              <td>{transaction.date.slice(11, 16)}</td>
              <td>{transaction.party1}</td>
              <td>{transaction.party2}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.status}</td>
              <td><button 
                disabled={isPending}
                onClick={() => {
                  if (transaction.status === "started") {
                    forceEnd(transaction._id);
                  }
                }}
              >{isPending ? "Pending..." : "Force End"}</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
   );
}
 
export default Games;
