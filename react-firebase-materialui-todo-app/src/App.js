import React, {createContext, useEffect, useState} from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import About from "./pages/About";
import AddEdit from "./pages/AddEdit";
import Home from "./pages/Home";
import View from "./pages/View";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Login from "./pages/Login";
import PrivateRoute from "./PrivateRoute";
import auth from "./auth/config";
import CheckIsOnline from "./pages/CheckIsOnline";

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null)
      }
    });

    return () => {
      unsubscribe()
    }
  }, []);
  return (
      <UserContext.Provider value={user}>
        <BrowserRouter>
          <div className="App">
            <PrivateRoute exact path={"/"} component={Header}  />
            <ToastContainer position="top-center" />
            <Switch>
              <Route exact path="/Login" component={Login} />
              <Route exact path="/LoginForm" component={Header} />
              <PrivateRoute exact path="/Home" component={Home} />
              <PrivateRoute path="/add" component={AddEdit} />
              <Route path="/update/:id" component={AddEdit} />
              <Route path="/view/:id" component={View} />
              <Route path="/about" component={About} />
              <Route path="/" component={CheckIsOnline} />
            </Switch>
          </div>
        </BrowserRouter>
      </UserContext.Provider>
  );
}

export default App;
