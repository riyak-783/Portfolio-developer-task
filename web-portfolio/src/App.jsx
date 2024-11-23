import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import WebsiteList from "./components/WebsiteList";

function App() {
  const [websites, setWebsites] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check if user is logged in from localStorage
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const handleSignup = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogin = (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
    } else {
      alert("Invalid credentials!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    // Keeping user info intact, remove the next line if you also want to clear user data
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  const addWebsite = (website) => setWebsites([...websites, website]);

  const updateWebsite = (index, updatedWebsite) => {
    const updatedList = [...websites];
    updatedList[index] = updatedWebsite;
    setWebsites(updatedList);
  };

  const deleteWebsite = (index) => {
    const updatedList = websites.filter((_, i) => i !== index);
    setWebsites(updatedList);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#161a1d] text-black">
        <Routes>
          <Route
            path="/login"
            element={
              !isLoggedIn ? (
                <Login onLogin={handleLogin} />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />
          <Route
            path="/signup"
            element={
              !isLoggedIn ? (
                <Signup onSignup={handleSignup} />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
                <WebsiteList
                  websites={websites}
                  updateWebsite={updateWebsite}
                  deleteWebsite={deleteWebsite}
                  addWebsite={addWebsite}
                  onLogout={handleLogout} // Pass logout handler to WebsiteList
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
