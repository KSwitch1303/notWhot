import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../contexts/UserContext";

const apiUrl = process.env.REACT_APP_API_URL;
const Withdraw = () => {
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
        `${apiUrl}/getWithdraw/${username}`
      );
      if (response.data.success) {
        setTransactions(response.data.transactions);
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
    <div className="histWithdraw">
      {isPending && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {transactions && (
        <table>
          <caption>Withdraw Details</caption>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction.date.split("T")[0]}</td>
                <td>{transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
   );
}
 
export default Withdraw;