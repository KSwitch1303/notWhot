import { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;
const Wins = (props) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getWins();
  }, []);
  const getWins = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getWins`);
      if (response.data.success) {
        setTransactions(response.data.transactions);
      } else {
        console.error("Failed to fetch wins");
      }
    } catch (error) {
      console.error(error);
    }
  }
  return ( 
    <div className="wins">
      <h1>Wins</h1>
      <button onClick={() => props.setPage("home")}>Home</button>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Player</th>
            <th>Room Code</th>
            <th>Amount</th>
            <th>Status</th> 
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.date}</td>
              <td>{transaction.party1}</td>
              <td>{transaction.party2}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
   );
}
 
export default Wins;