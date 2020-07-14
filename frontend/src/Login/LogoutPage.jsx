import React, { Component } from "react";
import AuthenticationService from "../service/AuthenticationService.js";

class LogoutComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <section className="callto-action-area section-gap" id="home">
          <div className="overlay overlay-bg" />
          <div className="container">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="about-content col-lg-12">
                <h1 className="text-white">
                  You are logged out. Thank You for Using Our Application.
                </h1>
                <p className="text-white link-nav">
                  <a href="/">Home Page </a>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="callto-action-area section-gap"></section>
      </div>
    );
  }
}

export default LogoutComponent;
