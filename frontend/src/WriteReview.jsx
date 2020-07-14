import React, { Component } from "react";
import axios from "axios";
import AuthenticationService, { USER_NAME_SESSION_ATTRIBUTE_NAME } from "./service/AuthenticationService.js";
import { Form, Col, Button } from "react-bootstrap";
import AppNav from './AppNav'
import { createBrowserHistory } from "history";

export const history = createBrowserHistory({ forceRefresh: true });

class WriteReview extends Component {
    constructor(props) {
      super(props);
      this.state = {
        Review: {},
        communicationSkills: "",
        bodyLanguage: "",
        opinion: "",
        interviewId: 0,
        userEmail: ""
      };
    }

    async componentDidMount() {
      
      console.log(this.props.match.params.id);
   
      this.setState({
        userEmail: sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME),
        interviewId:this.props.match.params.id
      })
    }

    changeHandler = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    };

    // submitHandler = (e) => {
    //   // const category = {
    //   //   id: this.state.category,
    //   // };
    //   const data = {
    //     communicationSkills: this.state.communicationSkills,
    //     bodyLanguage: this.state.bodyLanguage,
    //     opinion: this.state.opinion,
    //   };
    //   console.log(data);
    //   e.preventDefault();
    //   // console.log(this.state);
    //   var config = {
    //     headers: {
    //       "Access-Control-Allow-Origin": true,
    //       "Access-Control-Allow-Methods": "OPTIONS,GET,PUT,POST,DELETE",
    //       "Access-Control-Allow-Headers": "X-Requested-With, Content-Type",
    //       Authorization: AuthenticationService.getToken(),
    //     },
    //   };
    //   axios
    //     .put(`http://localhost:8080/reviews/${this.state.id}`, data, config)
    //     .then((response) => {
    //       console.log(response);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // };

   submitHandler=(e) => {
      const data = {
            communicationSkills: this.state.communicationSkills,
            bodyLanguage: this.state.bodyLanguage,
            opinion: this.state.opinion,
            interviewId: this.state.interviewId,
            userEmail: this.state.userEmail
          };
          // console.log(data);
          //e.preventDefault();
          //console.log(this.state);
          var config = {
            headers: {
              "Access-Control-Allow-Origin": true,
              "Access-Control-Allow-Methods": "OPTIONS,GET,PUT,POST,DELETE",
              "Access-Control-Allow-Headers": "X-Requested-With, Content-Type",
              //Authorization: AuthenticationService.getToken(),
            },
          };
          /*const headers = {
            "Access-Control-Allow-Origin": true,
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods": "OPTIONS,GET,PUT,POST,DELETE",
            "Access-Control-Allow-Headers": "X-Requested-With, Content-Type",
          };*/
          return axios
            .post("http://localhost:8080/reviews", data, config).then(() =>         history.push("/jobposts")           );


      //return axios.post(`${API_URL}/users`,
      //    { headers: { authorization: this.createBasicAuthToken(username, password) } })
  }

    render() {
      const {
        Review,
        communicationSkills,
        bodyLanguage,
        opinion
      } = this.state;
      return ( 
        <div>
            <AppNav/>
            <section className="callto-action-area section-gap" id="home">
          <div className="overlay overlay-bg" />
          <div className="container">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="about-content col-lg-12">
                <h1 className="text-white">
                  Write your Review
                </h1>
                
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
                          <Form.Group as={Col} controlId="formCommunicationSkills">
                            <Form.Label>Communication Skills</Form.Label>
                            <Form.Control
                              type="text"
                              name="communicationSkills"
                              placeholder={Review.communicationSkills}
                              value={communicationSkills}
                              onChange={this.changeHandler}
                            />
                          </Form.Group>
                    </Form.Row>
                    <Form.Row>
                          <Form.Group as={Col} controlId="formBodyLanguage">
                            <Form.Label>Body Language</Form.Label>
                            <Form.Control
                              type="text"
                              name="bodyLanguage"
                              placeholder={Review.bodyLanguage}
                              value={bodyLanguage}
                              onChange={this.changeHandler}
                            />
                          </Form.Group>
                    </Form.Row>
                    <Form.Row>
                          <Form.Group as={Col} controlId="formOpinion">
                            <Form.Label>Opinion</Form.Label>
                            <Form.Control
                              type="text"
                              name="opinion"
                              placeholder={Review.opinion}
                              value={opinion}
                              onChange={this.changeHandler}
                            />
                          </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Button
                          variant="primary"
                          type="button"
                          onClick={this.submitHandler}
                          className="mt-4"
                        >
                          Submit
                        </Button>
                    </Form.Row>
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
                    <form target="_blank" noValidate={true} action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&id=92a4423d01" method="get" className="form-inline">
                      <div className="form-group row" style={{width: '100%'}}>
                        <div className="col-lg-8 col-md-12">
                          <input name="EMAIL" placeholder="Enter Email" required type="email" />
                          <div style={{position: 'absolute', left: '-5000px'}}>
                            <input name="b_36c4fd991d266f23781ded980_aefe40901a" tabIndex={-1} defaultValue type="text" />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                          <button className="nw-btn primary-btn">Send<span className="lnr lnr-arrow-right" /></button>
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
  
  export default WriteReview;
  