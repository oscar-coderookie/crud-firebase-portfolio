import "./App.scss";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import ReactPage from "./pages/ReactPage/ReactPage";
import AngularPage from "./pages/AngularPage/AngularPage";
import NodejsPage from "./pages/NodejsPage/NodejsPage";
import AngularDetail from "./pages/AngularPage/AngularDetail/AngularDetail";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  

  return (
    <div className="app">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/react">
            <ReactPage />
          </Route>
          <Route exact path="/angular">
            <AngularPage/>
          </Route>
          <Route exact path="/angular/:id">
            <AngularDetail />
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
