const Home = (props) => {
  return ( 
    <div className="histHome">
      <button onClick={() => props.setHistPage("topup")}>Top-up History</button>
      <button onClick={() => props.setHistPage("withdraw")}>Withdraw History</button>
      <button onClick={() => props.setHistPage("game")}>Game History</button>
      <button onClick={() => props.setHistPage("win")}>Win History</button>
      <button onClick={() => props.setHistPage("loss")}>Loss History</button>
    </div>
   );
}
 
export default Home;