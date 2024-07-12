import './index.css';
import { useEffect, useState } from "react";
import axios from "axios";
import AdminPage from './pages/Admin';
import Games from './pages/Games';
import Withdrawals from './pages/Withdrawals';
import Payments from './pages/Payments';
import Wins from './pages/Wins';
import Losses from './pages/Losses';

const Admin = () => {
  // const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState('home');

  // useEffect(() => {
  //   axios.get(`${process.env.REACT_APP_API_URL}/getTransactions`).then((response) => {
  //     if (response.data.success) {
  //       console.log(response.data.transactions);
  //       setTransactions(response.data.transactions);
  //     }
  //   });
  // }, []);

  // const updateTransaction = async (transactionId, status) => {
  //   try {
  //     await axios.post(`${process.env.REACT_APP_API_URL}/updateTransaction`, { transactionId, status });
  //     axios.get(`${process.env.REACT_APP_API_URL}/getTransactions`).then((response) => {
  //       if (response.data.success) {
  //         console.log(response.data.transactions);
  //         setTransactions(response.data.transactions);
  //       }
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="adminPage">
      {/* <h1>Admin</h1> */}
      <div className="adminContent">
        {page === 'home' && <AdminPage setPage={setPage} />}
        {page === 'games' && <Games setPage={setPage} />}
        {page === 'withdrawals' && <Withdrawals setPage={setPage} />}
        {page === 'payments' && <Payments setPage={setPage} />}
        {page === 'wins' && <Wins setPage={setPage} />}
        {page === 'losses' && <Losses setPage={setPage} />}
      </div>
      {/* <div className="adminTable">
        <table>
          <thead>
            <tr>
              <th>Receiver</th>
              <th>Sender</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Transaction Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction.receiver}</td>
                <td>{transaction.sender}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.status}</td>
                <td>{transaction.tno}</td>
                <td>
                  <button onClick={() => updateTransaction(transaction._id, "Approved")}>Approve</button>
                  <button onClick={() => updateTransaction(transaction._id, "Failed")}>Failed</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default Admin;
