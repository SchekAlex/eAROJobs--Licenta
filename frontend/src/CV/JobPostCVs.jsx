import React, { Component } from "react";
import AppNav from "../AppNav";
import CV from "./CV";
import AuthenticationService, {
  USER_NAME_SESSION_ATTRIBUTE_NAME,
} from "../service/AuthenticationService";
import axios from "axios";

class JobPostCVs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      JobPost: {},
      CVs: [],
      isLoading: true,
      isEmployee: false,
    };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    const response = await fetch(`/jobposts/${id}`);
    const body = await response.json();
    this.setState({
      isLoading: false,
      JobPost: body,
      CVs: body.user,
      isEmployee:
        AuthenticationService.isEmployee() ||
        AuthenticationService.isRecruiter(),
    });
  }

  addRecommendation = (e) => {
    const { id } = this.props.match.params;
    // console.log(id);
    const data = {
      employeeMail: sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME),
      userId: e.target.id,
      interviewId: id,
    };
    console.log(data);
    var config = {
      headers: {
        "Access-Control-Allow-Origin": true,
        "Access-Control-Allow-Methods": "OPTIONS,GET,PUT,POST,DELETE",
        "Access-Control-Allow-Headers": "X-Requested-With, Content-Type",
        Authorization: AuthenticationService.getToken(),
      },
    };
    axios.post(`http://localhost:8080/recommendations`, data, config);
    this.componentDidMount();
  };

  render() {
    const { isLoading, JobPost, isEmployee } = this.state;
    if (isLoading) {
      return <div>Loading...</div>;
    }
    console.log(isEmployee);
    return (
      <div>
        <AppNav />
        <section className="callto-action-area section-gap" id="home">
          <div className="overlay overlay-bg" />
          <div className="container">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="about-content col-lg-12">
                <h1 className="text-white">
                  Users that applied to job : {JobPost.title}
                </h1>
                <p className="text-white link-nav">
                  <a href="/">JobPost </a>{" "}
                  <span className="lnr lnr-arrow-right" />{" "}
                  <a href="/jobposts"> Candidates</a>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="callto-action-area section-gap">
          <div className="col-lg-12 post-list">
            <div class="progress-table-wrap">
              <h3 class="text-white mb-30">
                Users that applied to : {JobPost.title}{" "}
              </h3>

              <div class="progress-table">
                <div class="table-head">
                  <div class="country ml-4">First Name</div>
                  <div class="visit">Last Name</div>
                  <div class="percentage">CV</div>
                  <div class="percentage">Review</div>
                  {isEmployee ? <div class="percentage">Recommend</div> : null}
                </div>
                {JobPost.users.map((user) => (
                  <div class="table-row">
                    <div class="country ml-4">{user.firstName}</div>
                    <div class="visit ml-4">{user.lastName}</div>
                    <div class="percentage ml-4">
                      <a
                        class="genric-btn info-border circle"
                        href={"/cvs/email/" + user.email}
                      >
                        View CV
                      </a>
                    </div>
                    <div class="percentage ml-4">
                      <a
                        class="genric-btn info-border circle"
                        href={"/reviews/addreview/" + user.id}
                      >
                        Write Review
                      </a>
                    </div>
                    <div class="percentage ml-4">
                      {isEmployee ? (
                        <a
                          class="genric-btn info-border circle"
                          href=""
                          onClick={this.addRecommendation}
                          id={user.id}
                        >
                          Recommend Candidate
                        </a>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default JobPostCVs;
