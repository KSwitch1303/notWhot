import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../contexts/UserContext";

const apiUrl = process.env.REACT_APP_API_URL;
const Game = () => {
  const { username } = useContext(UserContext);
  const [transactions, setTransactions] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true);
    getTransactions();
  }, []);

  const getTransactions = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/getGame/${username}`
      );
      if (response.data.success) {
        const unsortedTransactions = response.data.transactions;
        const sortedTransactions = unsortedTransactions.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        })
        setTransactions(sortedTransactions);
      } else {
        setError("Failed to fetch transactions.");
      }
    } catch (error) {
      setError("An error occurred while fetching transactions.");
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };
  return ( 
    <div className="histGame">
      {isPending && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {transactions && (
        <table>
          <caption>Game Details</caption>
          <thead>
            <tr>
              <th>player 1</th>
              <th>player 2</th>
              <th>Stake</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction.party1.split(" VS ")[0]}</td>
                <td>{transaction.party1.split(" VS ")[1]}</td>
                <td>{transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
   );
}
 
export default Game;