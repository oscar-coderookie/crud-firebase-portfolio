import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import ReactPage from "./pages/ReactPage/ReactPage";
import AngularPage from "./pages/AngularPage/AngularPage";
import NodejsPage from "./pages/NodejsPage/NodejsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MobileHeader from "./components/MobileHeader/MobileHeader";
import HtmlPage from "./pages/HtmlPage/HtmlPage";
import Authenticate from "./pages/Authenticate/Authenticate";

import firebase from "./config/firebase";

function App(){
  const [breakpoint, setBreakpoint] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      if(currentUser) {
        setUser({ uid: currentUser.uid, email: currentUser.email });
      }else{
        setUser(null);
      }
      setLoading(false);
    });
  }, []);

  function handleLogout() {
    firebase
      .auth()
      .signOut()
      .catch((err) => {
        console.error("Error in signOut", err.message);
      });
  }

  const handleWindowResize = () => {
    if(window.innerWidth > 768) {
      setBreakpoint(true);
    } else {
      setBreakpoint(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    if (window.innerWidth > 768) {
      setBreakpoint(true);
    } else {
      setBreakpoint(false);
    }
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className="app">
      <Router>
        {!breakpoint ? <MobileHeader hasUser={!!user} onLogout={() => handleLogout()} /> : null}
        {breakpoint ? <Header hasUser={!!user} onLogout={() => handleLogout()} /> : null}

        <Switch>
          <Route exact path="/react">
            {user ? <ReactPage userId={user.uid} /> : <Authenticate onLogin={setUser} />}
          </Route>
          <Route exact path="/angular">
            {user ? <AngularPage userId={user.uid} /> : <Authenticate onLogin={setUser} />}
          </Route>
          <Route exact path="/nodejs">
            {user ? <NodejsPage userId={user.uid} /> : <Authenticate onLogin={setUser} />}
          </Route>
          <Route exact path="/html">
            {user ? <HtmlPage userId={user.uid} /> : <Authenticate onLogin={setUser} />}
          </Route>
          <Route exact path="/">
            {user ? <Home userId={user.uid} /> : <Authenticate onLogin={setUser} />}
          </Route>
        </Switch>
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;
