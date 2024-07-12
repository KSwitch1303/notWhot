import { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;
const Withdrawals = (props) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getWithdrawals();
  }, []);
  const getWithdrawals = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getWithdrawals`);
      if (response.data.success) {
        setTransactions(response.data.transactions);
      } else {
        console.error("Failed to fetch withdrawals");
      }
    } catch (error) {
      console.error(error);
    }
  }
  return ( 
    <div className="withdrawals">
      <h1>Withdrawals</h1>
      <button onClick={() => props.setPage("home")}>Home</button>
      <table>
        <thead>
          <tr>
            <th>Receiver</th>
            <th>Sender</th>
            <th>Amount</th>
            <th>Status</th> 
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.party1}</td>
              <td>{transaction.party2}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.status}</td>
              <td>
                <button onClick={() => {
                  axios.post(`${apiUrl}/updateTransaction`, { transactionId: transaction._id, status: "Approved" });
                  getWithdrawals();
                }}>Approve</button>
                <button onClick={() => {
                  axios.post(`${apiUrl}/updateTransaction`, { transactionId: transaction._id, status: "Failed" });
                  getWithdrawals();
                }}>Failed</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
   );
}
 
export default Withdrawals;