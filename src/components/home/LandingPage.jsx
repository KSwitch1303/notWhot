import '../Styles/LandingPage.css'
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();
  return ( 
    <div className="landingPage">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"/>
      <div className="landingPageContent">
        <h1>Welcome to notWhot</h1>
        <div className="landingPageBtns">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
        <div className="support">
          <h3>Support</h3>
          <p>Have questions, suggestions, or complaints? Contact us on <a href="https://wa.me/2348084929504" target="_blank">WhatsApp <i class="fa-brands fa-whatsapp"></i></a></p>
        </div>
      </div>
    </div>
   );
}
 
export default LandingPage;