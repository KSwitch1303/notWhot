import "../../Styles/Transactions.css";
import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const Transactions = (props) => {
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
        `${process.env.REACT_APP_API_URL}/getTransactions/${props.username}`
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
    <div className="transactionsPage">
      <h1>Transactions</h1>
      <div className="transactionContent">
        {isPending ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <table>
            <caption>Transaction Details</caption>
            <thead>
              <tr>
                <th>Tx No</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.transactionId}>
                  <td>{transaction.tno}</td>
                  <td>₦{transaction.amount}</td>
                  <td>{transaction.status}</td>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

Transactions.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Transactions;
