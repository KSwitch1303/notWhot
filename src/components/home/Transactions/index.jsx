import ReceivedTransactions from "./Received";
import SentTransactions from "./Sent";

const Transactions = () => {
  return ( 
    <div className="transactions">
      <h1>Transactions</h1>
      <div className="transactionContent" style={{width: '1000px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <SentTransactions />
        <ReceivedTransactions />
      </div>
      
    </div>
   );
}
 
export default Transactions;