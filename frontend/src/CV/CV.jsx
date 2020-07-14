import React, { Component } from "react";
import axios from "axios";
import AppNav from "../AppNav";
import AuthenticationService, {
  USER_NAME_SESSION_ATTRIBUTE_NAME,
} from "../service/AuthenticationService";
import { createBrowserHistory } from "history";
export const history = createBrowserHistory({ forceRefresh: true });

class CV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CV: {},
      User: {},
      Experience: [],
      isLoading: true,
      Recommendations: []
    };
  }

  async componentDidMount() {
    const { email } = this.props.match.params;
    axios
      .get(
        `http://localhost:8080/cvs/email/${email}`
      )
      .then((res) => {
        const body = res.data;
        //   console.log(body.user.firstName);
        this.setState({
          isLoading: false,
          CV: body,
          User: body.user,
          Experience: body.experience,
        });
      });
  }

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  createCV() {
    const data = {
      userEmail: sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME),
    };
    var config = {
      headers: {
        "Access-Control-Allow-Origin": true,
        "Access-Control-Allow-Methods": "OPTIONS,GET,PUT,POST,DELETE",
        "Access-Control-Allow-Headers": "X-Requested-With, Content-Type",
        Authorization: AuthenticationService.getToken(),
      },
    };
    axios
      .post(`http://localhost:8080/cvs/`, data, config)
      .then(
        history.push(
          `/cvs/${sessionStorage.getItem(
            USER_NAME_SESSION_ATTRIBUTE_NAME
          )}/edit`
        )
      );
  }

  render() {
    const { isLoading, CV, User, Experience } = this.state;
    // console.log(CV.user.email);
    // if (isLoading) {
    //   return <div>Loading ..</div>;
    // }
    return (
      <div>
        <AppNav />
        <section className="callto-action-area section-gap" id="home">
          <div className="overlay overlay-bg" />
          <div className="container">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="about-content col-lg-12">
                <h1 className="text-white">CV's</h1>
                <p className="text-white link-nav">
                  <a href="/jobposts">CV's </a>{" "}
                  <span className="lnr lnr-arrow-right" />{" "}
                  <a>
                    {" "}
                    {User.firstName} {User.lastName} CV
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="callto-action-area section-gap">
          <div className="container">
            <div className="row justify-content-center d-flex">
              <div className="col-lg-8 post-list">
                <div className="container">
                  <div className="single-post d-flex flex-row justify-content-center">
                    {!this.isEmpty(CV)||AuthenticationService.isRecruiter() ? (
                      <div key={CV.id}>
                        <p>CV for user: {User.firstName}</p>
                        <p>Last Name: {User.lastName}</p>
                        <p>Email: {User.email}</p>
                        <p>Birth Date: {User.birthDate}</p>
                        <br />
                        <p>Education: {CV.education}</p>
                        <p>Skills: {CV.skills}</p>
                        <p>Description: {CV.description}</p>
                        <p>Experience : </p>
                        {Experience.map((experience) => (
                          <li key={experience.id}>{experience.companyName}</li>
                        ))}

                      </div>
                    ) : (
                      <div>
                        <a href="" onClick={this.createCV}>
                          Create your CV
                        </a>
                      </div>
                    )}
                  </div>
                </div>
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

export default CV;
