import React, { useEffect, useState } from "react";
import ProductPage from "./components/pages/AllProducts";
import { Outlet, useLocation } from "react-router-dom";
import { login, logout } from "./store/authSlice";
import { useDispatch } from "react-redux";
import NavBar from "./components/smallComponents/NavBar";
import { getCurrentUser } from "./api";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    getCurrentUser()
      .then((userData) => {
        console.log("dispatch appjsx", userData);
        console.log(location);
        if (userData) {
          // Extract serializable data from headers and config
          const { data } = userData;
          dispatch(login({ userData: data }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [location]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-orange-50 dark:bg-slate-700 h-full  overflow-hidden">
      <NavBar theme={theme} setTheme={setTheme} toggleTheme={toggleTheme}/>
      <Outlet />
    </div>
  );
}

export default App;
