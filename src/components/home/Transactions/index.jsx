import "../../Styles/Transactions.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Transactions = (props) => {
  const [transactions, setTransactions] = useState([]);
  const [isPending, setIsPending] = useState(false);

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
        setIsPending(false);
      }
    } catch (error) {
      console.error(
        `${process.env.REACT_APP_API_URL}/getTransactions/${props.username}`
      );
    }
  };

  return (
    <div className="transactionsPage">
      <h1>Transactions</h1>
      <div className="transactionContent">
        {isPending ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Transaction Number</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.transactionId}>
                  <td>{transaction.tno}</td>
                  <td>${transaction.amount}</td>
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

export default Transactions;
