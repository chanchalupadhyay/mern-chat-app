import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Navigation from "./component/navigation";
import Home from "./component/home";
import Chatroom from "./component/chatroom";
import Login from "./component/login";
import Logout from "./component/logout";
import Register from "./component/register";
import Dashboard from "./component/dashboard";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

function App() {
  return (
    <>
      <Router>
        <Navigation />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/chatroom" component={Chatroom} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
