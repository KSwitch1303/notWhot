import { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;
const Payments = (props) => {
  const [transactions, setTransactions] = useState([]);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    getPayments();
  }, []);
  const getPayments = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getPayments`);
      if (response.data.success) {
        setTransactions(response.data.transactions);
      } else {
        console.error("Failed to fetch payments");
      }
    } catch (error) {
      console.error(error);
    }
    setIsPending(false);
  }

  return ( 
    <div className="payments">
      <h1>Payments</h1>
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
                <button disabled={isPending} onClick={async () => {
                  setIsPending(true);
                  if (transaction.status === "Approved") return;
                  await axios.post(`${apiUrl}/updateBalance`, { transactionId: transaction._id, status: "Approved", amount: transaction.amount });
                  getPayments();
                }}>{isPending ? "Approving..." : "Approve"}</button>
                <button disabled={isPending} onClick={async () => {
                  setIsPending(true);
                  if (transaction.status === "Approved") {
                    await axios.post(`${apiUrl}/reduceBalance`, { transactionId: transaction._id, status: "Failed", amount: transaction.amount });
                    getPayments();
                    return;
                  }                  
                  await axios.post(`${apiUrl}/updateBalance`, { transactionId: transaction._id, status: "Failed" });
                  getPayments();
                }}>{isPending ? "Rejecting..." : "Reject"}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
   );
}
 
export default Payments;