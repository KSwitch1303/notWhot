import '../Styles/Rules.css'
const Rules = (props) => {
  return ( 
    <div className="transactionsPage">
      <h1>Rules</h1>
      <div className="transactionContent rules">
        <p>2 = pick 2 (no defending pick 2s)</p>
        <p>1 = hold on</p>
        <p>8 = suspension</p>
        <p>14 = market</p>
        <p>20 = I need</p>
        <p>You can "check up" with any card</p>
      </div>
      <button onClick={() => { props.setPage("home") } }>Back</button>
    </div>
   );
}
 
export default Rules;