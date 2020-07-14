import React, { Component } from "react";
import axios from "axios";
import AuthenticationService, {
  USER_NAME_SESSION_ATTRIBUTE_NAME,
} from "../service/AuthenticationService.js";
import { Form, Col, Button } from "react-bootstrap";
import AppNav from "../AppNav";

import { createBrowserHistory } from "history";
export const history = createBrowserHistory({ forceRefresh: true });

class EditCV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: "",
      description: "",
      education: "",
      companyName: "",
      jobDescription: "",
      jobTitle: "",
      CV: {},
      id: 0,
      Experience: [],
    };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;

    axios
      .get(
        `/cvs/email/${sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)}`
      )
      .then((res) => {
        const body = res.data;
        this.setState({
          isLoading: false,
          CV: body,
          id: body.id,
          Experience: body.experience,
        });
      });
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    // const category = {
    //   id: this.state.category,
    // };
    const data = {
      skills: this.state.skills,
      description: this.state.description,
      education: this.state.education,
    };
    console.log(data);
    e.preventDefault();
    // console.log(this.state);
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
        `http://localhost:8080/cvs/${sessionStorage.getItem(
          USER_NAME_SESSION_ATTRIBUTE_NAME
        )}`,
        data,
        config
      )
      .then((response) => {
        console.log(response);
        history.push(
          `/cvs/email/${sessionStorage.getItem(
            USER_NAME_SESSION_ATTRIBUTE_NAME
          )}`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  addExperience = (e) => {
    // const category = {
    //   id: this.state.category,
    // };
    const data = {
      companyName: this.state.companyName,
      jobDescription: this.state.jobDescription,
      jobTitle: this.state.jobTitle,
    };
    console.log(data);
    e.preventDefault();
    // console.log(this.state);
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
        `http://localhost:8080/cvs/add-experience/${e.target.id}`,
        data,
        config
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const {
      skills,
      education,
      description,
      CV,
      Experience,
      companyName,
      jobDescription,
      jobTitle,
    } = this.state;
    return (
      <div>
        <AppNav />
        <section className="callto-action-area section-gap" id="home">
          <div className="overlay overlay-bg" />
          <div className="container">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="about-content col-lg-12">
                <h1 className="text-white">Edit Your CV</h1>
              </div>
            </div>
          </div>
        </section>
        <section className="callto-action-area section-gap">
          <div className="container">
            <div className="row justify-content-center d-flex">
              <div className="col-lg-8 post-list">
                <div className="single-post d-flex flex-row justify-content-center">
                  <Form>
                    <Form.Row>
                      <Form.Group as={Col} controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          type="text"
                          name="description"
                          placeholder={CV.description}
                          value={description}
                          onChange={this.changeHandler}
                        />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formSkills">
                        <Form.Label>Skills</Form.Label>
                        <Form.Control
                          type="text"
                          name="skills"
                          placeholder={CV.skills}
                          value={skills}
                          onChange={this.changeHandler}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group as={Col} controlId="formSkills">
                        <Form.Label>Education</Form.Label>
                        <Form.Control
                          type="text"
                          name="education"
                          placeholder={CV.education}
                          value={education}
                          onChange={this.changeHandler}
                        ></Form.Control>
                      </Form.Group>
                    </Form.Row>
                    {/* <Form.Group controlId="formDescription">
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows="7"
                            placeholder={User.description}
                            name="description"
                            value={description}
                            onChange={this.changeHandler}
                          />
                        </Form.Group> */}
                    {/* <Form.Group controlId="formGridAddress2">
                              <Form.Label>Address 2</Form.Label>
                              <Form.Control placeholder="Apartment, studio, or floor" />
                            </Form.Group> */}
                    <Form.Row>
                      <div>
                        <h5>Experience : </h5>
                      </div>
                    </Form.Row>

                    <div>
                      {Experience.map((experience) => (
                        <li key={experience.id}>{experience.companyName}</li>
                      ))}
                    </div>
                    <Form.Row>
                      <Form.Group as={Col} controlId="formDescription">
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="companyName"
                          placeholder=""
                          value={companyName}
                          onChange={this.changeHandler}
                        />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formSkills">
                        <Form.Label>Job Title</Form.Label>
                        <Form.Control
                          type="text"
                          name="jobTitle"
                          placeholder=""
                          value={jobTitle}
                          onChange={this.changeHandler}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formSkills">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          type="text"
                          name="jobDescription"
                          placeholder=""
                          value={jobDescription}
                          onChange={this.changeHandler}
                        ></Form.Control>
                      </Form.Group>
                    </Form.Row>

                    <Form.Row>
                      <Button
                        variant="primary"
                        type="button"
                        onClick={this.addExperience}
                        id={CV.id}
                        className="mt-4"
                      >
                        Add Experience
                      </Button>
                    </Form.Row>
                    {/* <Form.Group as={Col} controlId="formEmail">
                            <Form.Label>Experience</Form.Label>
                            <Form.Control
                              type="text"
                              name="experience"
                              placeholder={CV.expreience}
                              value={}
                              onChange={this.changeHandler}
                            />
                          </Form.Group> */}

                    {/* <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Stock</Form.Label>
                                <Form.Control as="select" value="Choose...">
                                  <option>Choose...</option>
                                  <option>...</option>
                                </Form.Control>
                              </Form.Group> */}

                    {/* <Form.Group as={Col} controlId="formPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="0"
                              name="price"
                              value={price}
                              onChange={this.changeHandler}
                            />
                          </Form.Group> */}
                    {/* <div class="col-md-6">
                          <input
                            type="file"
                            name="image"
                            onChange={this.changeHandlerFile}
                          />
                        </div> */}
                    <Button
                      variant="primary"
                      type="button"
                      onClick={this.submitHandler}
                      className="mt-4"
                    >
                      Submit
                    </Button>
                  </Form>
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

export default EditCV;
