import '../Styles/Profile.css'
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const Profile = (props) => {
  const [isPending, setIsPending] = useState(false);
  const {bank, setBank, accountNO, setAccountNO, accountName, setAccountName} = useContext(UserContext);
  const [fbank, setFbank] = useState(bank);
  const [faccountNO, setFaccountNO] = useState(accountNO);
  const [faccountName, setFaccountName] = useState(accountName);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    sendRequest();
  }

  const sendRequest = async () => {
    try {
      const response = await axios.post(`${apiUrl}/update`, { 
        username: props.username, 
        bank: fbank, 
        accountNo: faccountNO, 
        accountName: faccountName 
      });
      const data = await response.data;
      if (data.success) {
        alert(data.message);
        setBank(fbank);
        setAccountNO(faccountNO);
        setAccountName(faccountName);
        props.setPage("home");
      } else {
        alert(data.message);
      }
      setIsPending(false);
    } catch (error) {
      alert(error);
      setIsPending(false);
    }
  }

  return ( 
    <div className="profilePage">
      <h1>Profile</h1>
      <div className="profileForm">
        <form className="profileFormContent" onSubmit={handleSubmit}>
          <div className="formgroup">
            <label htmlFor="bank">Bank<span>*</span></label>
            <input disabled={isPending} onChange={(e) => setFbank(e.target.value)} value={fbank} type="text" id="bank" name="bank" required />
          </div>
          <div className="formgroup">
            <label htmlFor="accountNO">Account Number<span>*</span></label>
            <input disabled={isPending} onChange={(e) => setFaccountNO(e.target.value)} value={faccountNO} type="text" id="accountNO" name="accountNO" required />
          </div>
          <div className="formgroup">
            <label htmlFor="accountName">Account Name<span>*</span></label>
            <input disabled={isPending} onChange={(e) => setFaccountName(e.target.value)} value={faccountName} type="text" id="accountName" name="accountName" required />
          </div>
          <button disabled={isPending} type="submit">{isPending ? "Updating..." : "Update"}</button>
        </form>
      </div>
      <button className="home-button" onClick={() => props.setPage("home")}>Home</button>
    </div>
  );
}
 
export default Profile;
