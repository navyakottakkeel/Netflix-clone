import React, { useEffect } from "react";
import Home from "./pages/Home/Home";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./pages/Login/Login";
import Player from "./pages/Player/Player";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "./context/AuthContext";
import netflix_spinner from '../src/assets/netflix_spinner.gif'
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import Watchlist from "./pages/Watchlist/Watchlist";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user && location.pathname !== "/login") {
      navigate("/login");
    }
  
    if (user && location.pathname === "/login") {
      navigate("/");
    }
  }, [user, loading, navigate]);

  if(loading){
    return (
      <div className="login-spinner">
        <img src={netflix_spinner} alt="" />
      </div>
    )
  }
  return (
    <div>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="/movie/:id" element={<MovieDetail />}/>
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </div>
  );
};

export default App;
