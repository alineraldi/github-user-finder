import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'
import searchIcon from '../img/search.png';

function App() {
  // Declaring states
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  // This function is called when the "Search" button is pressed. It is asynchronous because it makes an HTTP request to fetch data, it handles this asynchronously to avoid freezing the user interface.
  const fetchUser = async () => {
    // Removing previous data, if there's any:
    setError("");
    setUserData(null);
    if (!username) {
      setError("Please enter a username.");
      return;
    }

    try {
      console.log(`Fetching user data for ${username}...`);  // Log to check what username is being searched
      const response = await axios.get(`https://api.github.com/users/${username}`);
      console.log("User data:", response.data);  // Log the response from the API
      setUserData(response.data);
    } catch (err) {
      console.error("Error fetching user:", err);  // Log any error
      setError("User not found");
    }
  };

  const handleSearch = (e) => {
    if(e.key === 'Enter' || e.type === "click") {
      fetchUser();
    }
  }

  return (
    <div className="">
      <div className="input-box mt-3">
      <p className="text-gray-800 text-xs uppercase opacity-50 hover:text-white"><a href="https://github.com/alineraldi" target="_blank" rel="noopener noreferrer">alineraldi @ github</a></p>
        <h1 className="text-2xl font-bold text-white text-center mb-4">Github User Search</h1>
        <div className="flex mb-4">
          <input
            type="text"
            className="flex-1 border bg-transparent text-blue border-grey rounded-l-lg p-2 focus:outline-none border-yellow"
            placeholder="Type the username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleSearch}
          />
          <button
            onClick={handleSearch}
            className="bg-darkblue text-white px-4 py-2 rounded-r-lg focus:bg-blue"
          >
            <img className='w-3 object-contain' src={searchIcon} alt="search-icon" />
          </button>
        </div>

        {error && <p className="text-yellow text-center">{error}</p>}

        {userData && (
          <div className="text-center">
            <img
              src={userData.avatar_url}
              alt={userData.name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h2 className="text-x lowercase">{userData.login}</h2>
            <h2 className="text-xl font-bold">{userData.name || "Unnamed user"}</h2>
            <p className="text-yellow">Repositories: {userData.public_repos}</p>
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              // The 'rel="noopener noreferrer"' attribute is used for security and privacy reasons when using target="_blank".
              // - 'noopener' ensures that the new page cannot access the original page via window.opener, which prevents malicious pages from manipulating the original page.
              // - 'noreferrer' prevents the browser from sending the referring page's URL to the new page, which enhances privacy by not revealing where the user came from.
              // This is a best practice when opening links in a new tab (target="_blank") to protect against potential vulnerabilities.

              className="text-white hover:text-darkblue"
            >
              Go to {userData.name}'s GitHub profile
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
