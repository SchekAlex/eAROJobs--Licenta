import React, { Component } from "react";
import axios from "axios";
import AuthenticationService from "./service/AuthenticationService.js";

import AppNav from "./AppNav";
import { getRoles } from "@testing-library/react";

import { createBrowserHistory } from "history";

export const history = createBrowserHistory({ forceRefresh: true });

class Admin extends Component {
  state = {
    isLoading: true,
    Users: [],
    id: "",
    roles: [],
    title: "",
  };

  async componentDidMount() {
    const response = await fetch("/users");
    const body = await response.json();
    this.setState({ Users: body, isLoading: false });
  }

  changeHandler = (e) => {
    var roleList = [e.target.value];
    this.setState({ roles: roleList, id: e.target.id, title: e.target.value });
    console.log(this.state.roles);
  };

  changeClick = (e) => {
    const data = {
      roles: this.state.roles,
    };
    console.log(data);
    // e.preventDefault();
    console.log(this.state);
    var config = {
      headers: {
        "Access-Control-Allow-Origin": true,
        "Access-Control-Allow-Methods": "OPTIONS,GET,PUT,POST,DELETE",
        "Access-Control-Allow-Headers": "X-Requested-With, Content-Type",
        Authorization: AuthenticationService.getToken(),
      },
    };

    console.log(config);
    axios
      .put(
        `http://localhost:8080/users/${this.state.id}/changeRole/${this.state.title}`,
        data,
        config
      )
      .then((response) => {
        console.log(response);
        history.push("/admin");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { Users, isLoading } = this.state;
    if (isLoading) return <div>Loading...</div>;

    return (
      <div>
        <AppNav />
        <section className="callto-action-area section-gap" id="home">
          <div className="overlay overlay-bg" />
          <div className="container">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="about-content col-lg-12">
                <h1 className="text-white">Admin Page</h1>
              </div>
            </div>
          </div>
        </section>
        <section className="callto-action-area section-gap">
          <div className="col-lg-12 post-list">
            <div class="progress-table-wrap">
              <h3 class="text-white mb-30">User List</h3>

              <div class="progress-table">
                <div class="table-head">
                  <div class="country">First Name</div>
                  <div class="visit">Last Name</div>
                  <div class="percentage">E-mail</div>
                  <div class="percentage">Role</div>
                  <div class="country">Edit Role</div>
                </div>
                {Users.map((user) => (
                  <div class="table-row">
                    <div class="country">{user.firstName}</div>
                    <div class="visit">{user.lastName}</div>
                    <div class="percentage">{user.email}</div>
                    <div class="percentage">
                      {user.roleList.map((role) => role.title)}
                    </div>
                    <div class="country">
                      <div class="col-lg-2 form-cols">
                        <div class="default-select" id="default-selects2">
                          <select onChange={this.changeHandler} id={user.id}>
                            <option value="Candidat">Candidat</option>
                            <option value="Recruiter">Recruiter</option>
                            <option value="Manager">Manager</option>
                            <option value="Angajat">Angajat</option>
                            <option value="Admin">Admin</option>
                          </select>
                        </div>
                        <button
                          onClick={this.changeClick}
                          class="genric-btn primary small"
                        >
                          Change
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
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

export default Admin;
