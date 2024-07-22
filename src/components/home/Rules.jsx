import '../Styles/Rules.css'
const Rules = (props) => {
  return ( 
    <div className="transactionsPage">
      <h1 className="ruleH1">Rules</h1>
      <div className="transactionContent rules">
        <span>Rule 1</span>
        <p>2 = pick 2</p>
        <p>No defending pick 2s</p>
        <p>Makes the opponent pick two extra cards</p>
        <span>Rule 2</span>
        <p>1 = hold on</p>
        <p>Makes the opponent miss a turn</p>
        <span>Rule 3</span>
        <p>8 = suspension</p>
        <p>Makes the opponent miss a turn</p>
        <span>Rule 4</span>
        <p>14 = market</p>
        <p>Makes the opponent pick an extra card</p>
        <span>Rule 5</span>
        <p>20 = I need</p>
        <p>Let's you demand for any shape to be played</p>
        <span>Rule 6</span>
        <p>You can "check up" with any card</p>
      </div>
      <button onClick={() => { props.setPage("home") } }>Back</button>
    </div>
   );
}
 
export default Rules;