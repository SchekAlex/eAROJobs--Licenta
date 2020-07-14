import React, { Component } from "react";
import AuthenticationService from "../service/AuthenticationService.js";

import AppNav from "../AppNav.js";
import axios from "axios";

import { createBrowserHistory } from "history";
export const history = createBrowserHistory({ forceRefresh: true });
class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      id: 0,
      hasLoginFailed: false,
      showSuccessMessage: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.loginClicked = this.loginClicked.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  loginClicked = (e) => {
    // e.preventDefault();
    // console.log(this.state);
    AuthenticationService.executeBasicAuthenticationService(
      this.state.username,
      this.state.password
    )
      .then(() => {
        console.log(this.state.username);
        AuthenticationService.registerSuccessfulLogin(
          this.state.username,
          this.state.password
        );
        history.push("/");
      })
      .catch(() => {
        this.setState({ showSuccessMessage: false });
        this.setState({ hasLoginFailed: true });
      });
  };

  render() {
    return (
      <div>
        <AppNav />

        <section className="callto-action-area section-gap">
          <div className="row justify-content-center d-flex">
            <div className="col-lg-3 ">
              <form>
                <h3>Login</h3>
                {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>*/}
                {this.state.hasLoginFailed && (
                  <div className="alert alert-warning">Invalid Credentials</div>
                )}
                {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                {/*<ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/>*/}
                <div className="form-group">
                  <label>Email address</label>
                  <input
                    type="email"
                    name="username"
                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Enter email"
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Enter password"
                  />
                </div>

                <div className="form-group">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheck1"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
              </form>
              <button
                type="submit"
                className="btn btn-primary btn-block"
                onClick={this.loginClicked}
              >
                Submit
              </button>
            </div>
          </div>
        </section>
        <section className="callto-action-area section-gap"></section>
        <footer className="footer-area section-gap">
          <div className="container">
            <div className="row">
              <div className="col-lg-6  col-md-12">
                <div className="single-footer-widget newsletter">
                  <h6>Feedback</h6>
                  <p>You can send me your opinion regarding this app</p>
                  <div id="mc_embed_signup">
                    <form
                      target="_blank"
                      noValidate={true}
                      action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&id=92a4423d01"
                      method="get"
                      className="form-inline"
                    >
                      <div className="form-group row" style={{ width: "100%" }}>
                        <div className="col-lg-8 col-md-12">
                          <input
                            name="EMAIL"
                            placeholder="Enter Email"
                            required
                            type="email"
                          />
                          <div
                            style={{ position: "absolute", left: "-5000px" }}
                          >
                            <input
                              name="b_36c4fd991d266f23781ded980_aefe40901a"
                              tabIndex={-1}
                              defaultValue
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                          <button className="nw-btn primary-btn">
                            Send
                            <span className="lnr lnr-arrow-right" />
                          </button>
                        </div>
                      </div>
                      <div className="info" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default LoginComponent;
