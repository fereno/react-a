import React, {useEffect, useState} from "react";

import Login from "./Login/Login";
import Home from "./Home/Home";
import MainHeader from "./MainHeader/MainHeader";
import AuthContext from "../../storage/auth-context";

function AppPro() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userLogInValue = localStorage.getItem("isLoggedIn");
    if (userLogInValue === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "1");
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn}}>
      <MainHeader onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default AppPro;
