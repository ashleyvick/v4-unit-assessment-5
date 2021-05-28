import { Route, Switch } from "react-router-dom";
import Auth from "./Components/Auth/Auth";
import Dash from "./Components/Dash/Dash";
import Form from "./Components/Form/Form";
import Post from "./Components/Post/Post";
import React from "react";

const routes = (
  <Switch>
    <Route path="/" component={Auth}></Route>
    <Route path="/dash" component={Dash}></Route>
    <Route path="/post/:id" component={Post}></Route>
    <Route path="/form" component={Form}></Route>
  </Switch>
);

export default routes;
