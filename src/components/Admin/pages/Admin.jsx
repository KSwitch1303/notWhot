const AdminPage = (props) => {
  return ( 
    <div className="admin">
      <h1>Admin</h1>
      <div className="adminContent">
        <button onClick={() => props.setPage("games")}>Games</button>
        <button onClick={() => props.setPage("withdrawals")}>Withdrawals</button>
        <button onClick={() => props.setPage("payments")}>Payments</button>
        <button onClick={() => props.setPage("wins")}>Wins</button>
        <button onClick={() => props.setPage('losses')}>Losses</button>
        <button onClick={() => window.location.reload()}>Logout</button>
      </div>
    </div>
   );
}
 
export default AdminPage;