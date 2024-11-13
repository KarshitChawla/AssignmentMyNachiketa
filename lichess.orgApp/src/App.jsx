import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/user/${username}`
      );
      console.log(response.data);
      setUserData(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch user details");
      setUserData(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUserDetails();
  };

  return (
    <div>
      <h1>Lichess User Details</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Lichess username"
        />
        <button type="submit">Get Details</button>
      </form>
      {error && <p>{error}</p>}
      {userData && (
        <div>
          <h2>{userData.username}</h2>
          <p>Bio: {userData?.bio}</p>
          <p>Rating in Blitz: {userData.perfs?.blitz?.rating}</p>
          <p>Rating in Rapid: {userData.perfs?.bullet?.rating}</p>
          <p>Rating in Classical: {userData.perfs?.classical?.rating}</p>
          <p>Games Played: {userData.count?.all}</p>
        </div>
      )}
    </div>
  );
};

export default App;
