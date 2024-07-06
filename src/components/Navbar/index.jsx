import './index.css'
const Navbar = (props) => {
  return ( 
    <div className="navbar">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></link>
      <div className="navRight">
        <h1 className="username">{props.username}</h1>
        <h1>₦{props.balance}</h1>
      </div>

      <div className="navLeft">
        <h1 className="profile" onClick={() => props.setPage("profile")}><i class="fa-solid fa-user"></i></h1>
        <h1 className="topup" onClick={() => props.setPage("topup")}><i class="fa-solid fa-wallet"></i></h1>
        <h1 className='transactions' onClick={() => props.setPage("transactions")}><i class="fa-solid fa-receipt"></i></h1>
        <h1 className="logout" onClick={() => props.setLoggedIn(false)}><i class="fa-solid fa-right-from-bracket"></i></h1>
      </div>
    </div>
   );
}
 
export default Navbar;