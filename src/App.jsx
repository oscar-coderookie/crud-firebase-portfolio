import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState } from "react";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import ReactPage from "./pages/ReactPage/ReactPage";
import AngularPage from "./pages/AngularPage/AngularPage";
import NodejsPage from "./pages/NodejsPage/NodejsPage";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MobileHeader from "./components/MobileHeader/MobileHeader";


function App() {
  const [breakpoint, setBreakpoint] = useState(true);
  const handleWindowResize = () => {
    if (window.innerWidth > 768) {
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
      {!breakpoint ? <MobileHeader /> : null}
          {breakpoint ? <Header /> : null}
      
        <Switch>
          <Route exact path="/react">
            <ReactPage />
          </Route>
          <Route exact path="/angular">
            <AngularPage/>
          </Route>
          <Route exact path="/nodejs">
            <NodejsPage/>
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
      <ToastContainer/>
    </div>
  );
}

export default App;
