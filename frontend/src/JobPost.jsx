import React, { Component } from "react";
import AppNav from "./AppNav";
import AuthenticationService, {
  USER_NAME_SESSION_ATTRIBUTE_NAME,
} from "./service/AuthenticationService.js";
import axios from "axios";
import { createBrowserHistory } from "history";
export const history = createBrowserHistory({ forceRefresh: true });

class JobPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      JobPost: {},
      isLoading: true,
      isCandidate: false,
    };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    console.log(this.props.match.params);
    const response = await fetch(`/jobposts/${id}`);
    const body = await response.json();
    this.setState({
      isLoading: false,
      JobPost: body,
      isCandidate: AuthenticationService.isCandidate(),
    });
  }

  applyToJob(jobId) {
    var config = {
      headers: {
        "Access-Control-Allow-Origin": true,
        "Access-Control-Allow-Methods": "OPTIONS,GET,PUT,POST,DELETE",
        "Access-Control-Allow-Headers": "X-Requested-With, Content-Type",
        Authorization: AuthenticationService.getToken(),
      },
    };
    axios
      .put(
        `http://localhost:8080/jobposts/${jobId}/addUser/${sessionStorage.getItem(
          USER_NAME_SESSION_ATTRIBUTE_NAME
        )}`,
        config
      )
      .then(history.push("/jobposts"));
  }

  render() {
    const { isLoading, JobPost, isCandidate } = this.state;
    if (isLoading) {
      return <div>Loading...</div>;
    }
    var loggedInUser;
    if (
      AuthenticationService.isUserLoggedIn() &&
      AuthenticationService.isAngajatOrRecruiter()
    ) {
      loggedInUser = (
        <a
          class="genric-btn info-border circle"
          href={"/jobposts/" + JobPost.id + "/cvs"}
        >
          View Candidates
        </a>
      );
    } else {
      loggedInUser = "";
    }
    return (
      <div>
        <AppNav />
        {/* start banner Area */}
        <section className="callto-action-area section-gap" id="home">
          <div className="overlay overlay-bg" />
          <div className="container">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="about-content col-lg-12">
                <h1 className="text-white">Job Posts</h1>
                <p className="text-white link-nav">
                  <a href="/jobposts">Job Posts </a>{" "}
                  <span className="lnr lnr-arrow-right" />{" "}
                  <a> {JobPost.title}</a>
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* End banner Area */}
        <section className="callto-action-area section-gap">
          <div className="container">
            <div className="row justify-content-center d-flex">
              <div className="col-lg-8 post-list">
                {
                  <div
                    className="single-post d-flex flex-row justify-content-center"
                    key={JobPost.id}
                  >
                    <div className="details">
                      <div className="title-post d-flex flex-row justify-content-between">
                        <div className="titles">
                          <h4>{JobPost.title}</h4>

                          <h5>Job Nature: {JobPost.jobType}</h5>

                          <p className="address">
                            <span className="lnr lnr-database" /> Estimated
                            salary: {JobPost.revenue}
                          </p>
                          <p>Education: {JobPost.education}</p>
                          <p>Experience: {JobPost.experience}</p>
                          <p>Description: </p>
                          <blockquote class="generic-blockquote">
                            {JobPost.description}
                          </blockquote>
                          {isCandidate ? (
                            <p
                              class="genric-btn info-border circle"
                              onClick={() => this.applyToJob(JobPost.id)}
                            >
                              Apply
                            </p>
                          ) : null}
                          {loggedInUser}
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </section>
        {/* start footer Area */}
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
        {/* End footer Area */}
      </div>
    );
  }
}

export default JobPost;
