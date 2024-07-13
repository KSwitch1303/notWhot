import '../Styles/LeaderBoard.css'
import { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL
const Leaderboard = (props) => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    getLeaderboard();
  }, []);

  const getLeaderboard = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/getLeaderboard`
      );
      if (response.data.success) {
        setLeaderboard(response.data.leaderboard);
      } else {
        console.log("Failed to fetch leaderboard");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return ( 
    <div className="leaderboardPage">
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.totalWinnings}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => props.setPage("home")}>Home</button>
    </div>
   );
}
 
export default Leaderboard;