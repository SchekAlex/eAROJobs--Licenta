import React, { Component } from "react";
import axios from "axios";
import AppNav from "../AppNav";
import AuthenticationService from "../service/AuthenticationService";

class Interviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Interviews: [],
      roles: [],
      id: 0,
      RecommendationCount: 0
    };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    const response = await fetch(
      `http://localhost:8080/interviews/job-post/${id}`
    );
    const body = await response.json();
    this.setState({ Interviews: body, Recommendations: body.recommendation});
  }

  hireCandidate = (e) => {
    const data = {
      roles: ["Angajat"],
    };

    console.log(data);
    // e.preventDefault();
    console.log(e.target.id);
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
        `http://localhost:8080/users/${e.target.id}/changeRole/Angajat`,
        data,
        config
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    // e.preventDefault();
  };

  render() {
    const { Interviews, Recommendations, RecommendationCount } = this.state;
    return (
      <div>
        <AppNav />
        <section className="callto-action-area section-gap" id="home">
          <div className="overlay overlay-bg" />
          <div className="container">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="about-content col-lg-12">
                {Interviews.map((interview) => (
                  <h1 className="text-white">
                    Interviews for {interview.job.title}
                  </h1>
                ))}
                <p className="text-white link-nav">
                  <a href="/jobposts">JobPosts </a>{" "}
                  <span className="lnr lnr-arrow-right" /> Interviews
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="callto-action-area section-gap">
          <div className="col-lg-12 post-list">
            <div class="progress-table-wrap">
              {Interviews.map((interview) => (
                <h3 class="text-white mb-30">
                  List of users that are in the interview stage for :{" "}
                  {interview.job.title}{" "}
                </h3>
              ))}
              <div class="progress-table">
                <div class="table-head">
                  <div class="country ml-4">First Name</div>
                  <div class="visit ml-4">Last Name</div>
                  <div class="percentage ml-4">Email</div>
                  <div class="percentage ml-4">Action</div>
                  <div class="percentage ml-4">Recommendations</div>
                </div>
                {Interviews.map((interview) => (
                  <div class="table-row">
                    <div class="country ml-4">{interview.user.firstName}</div>
                    <div class="visit ml-4">{interview.user.lastName}</div>
                    <div class="percentage ml-4">{interview.user.email}</div>
                    <div class="percentage ml-4">
                      <a
                        class="genric-btn info-border circle"
                        href=""
                        onClick={this.hireCandidate}
                        id={interview.user.id}
                      >
                        Hire
                      </a>
                    </div>
                    <div className="percentage ml-4 nav-menu">
                    <li class=" percentage menu-has-children">
                    {interview.recommendation.length} 
                    <ul>
                      {interview.recommendation.map((recommendation) => (
                        <li><a href="">{recommendation.employee.email}</a></li>
                      ))
                      }
                    </ul>
                </li>
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

export default Interviews;
