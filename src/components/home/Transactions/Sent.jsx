
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL
const SentTransactions = () => {

  const getTransactions = async () => {
    try {
      const response = await axios.get(`${apiUrl}/transactions/sent`);
      
    } catch (error) {
      console.error(error);
    }
  }
  return ( 
    <div className="sentTransactions">
      <h2>Sent Transactions</h2>
    </div>
   );
}
 
export default SentTransactions;