import "../../Styles/History.css";
import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Home from "./Home";
import Topup from "./Topup";
import Game from "./Game";
import Win from "./Win";
import Loss from "./Loss";
import Withdraw from "./Withdraw";


const Transactions = (props) => {
  const [transactions, setTransactions] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [histPage, setHistPage] = useState("home");

  // useEffect(() => {
  //   setIsPending(true);
  //   getTransactions();
  // }, []);

  // const getTransactions = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_API_URL}/getTransactions/${props.username}`
  //     );
  //     if (response.data.success) {
  //       setTransactions(response.data.transactions);
  //     } else {
  //       setError("Failed to fetch transactions.");
  //     }
  //   } catch (error) {
  //     setError("An error occurred while fetching transactions.");
  //     console.error(error);
  //   } finally {
  //     setIsPending(false);
  //   }
  // };

  return (
    <div className="transactionsPage">
      <div className="transactionContent">
      {histPage === "home" && <Home setHistPage={setHistPage} />}
      {histPage === "topup" && <Topup username={props.username} setHistPage={setHistPage} />}
      {histPage === "withdraw" && <Withdraw username={props.username} setHistPage={setHistPage} />}
      {histPage === "game" && <Game username={props.username} setHistPage={setHistPage} />}
      {histPage === "win" && <Win username={props.username} setHistPage={setHistPage} />}
      {histPage === "loss" && <Loss username={props.username} setHistPage={setHistPage} />}
      </div>
      <button onClick={() => {
        if (histPage === "home") {
          props.setPage("home");
        } else {
          setHistPage("home");
        }
      }}>Home</button>
    </div>
    // <div className="transactionsPage">
    //   <h1>Transactions</h1>
    //   <div className="transactionContent">
    //     {isPending ? (
    //       <p>Loading...</p>
    //     ) : error ? (
    //       <p className="error">{error}</p>
    //     ) : (
    //       <table>
    //         <caption>Transaction Details</caption>
    //         <thead>
    //           <tr>
    //             <th>Tx No</th>
    //             <th>Amount</th>
    //             <th>Status</th>
    //             <th>Date</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {transactions.map((transaction) => (
    //             <tr key={transaction.transactionId}>
    //               <td>{transaction.tno}</td>
    //               <td>₦{transaction.amount}</td>
    //               <td>{transaction.status}</td>
    //               <td>{new Date(transaction.date).toLocaleDateString()}</td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     )}
    //   </div>
    // </div>
  );
};



export default Transactions;
