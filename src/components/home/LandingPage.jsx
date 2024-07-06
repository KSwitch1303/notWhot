import '../Styles/LandingPage.css'
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();
  return ( 
    <div className="landingPage">
      <h1>Welcome to notWhot</h1>
      <div className="landingPageBtns">
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/signup")}>Sign Up</button>
      </div>
      <div className="support">
        <h3>Support</h3>
        <p>Have questions, suggestions, or complaints? Contact us on <a href="https://wa.me/2348084929504" target="_blank">WhatsApp</a></p>
      </div>
    </div>
   );
}
 
export default LandingPage;