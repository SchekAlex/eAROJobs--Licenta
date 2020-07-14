import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthenticationService from "../service/AuthenticationService";
import AppNav from "../AppNav";

class AdminRoute extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (AuthenticationService.isAdmin()) {
      return <Route {...this.props} />;
    } else {
      return <Redirect to="/" />;
    }
  }
}

export default AdminRoute;
