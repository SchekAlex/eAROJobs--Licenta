import React, { Component } from "react";
import axios from "axios";
import { Form, Col, Button } from "react-bootstrap";
import AuthenticationService from "../service/AuthenticationService.js";
import AppNav from '../AppNav'


class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      User: {},
      isLoading: true,
      firstName: "",
      lastName: "",
      email: "",
      id: 0,
    };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;

    axios.get(`/users/${id}`).then((res) => {
      const body = res.data;
      this.setState({ isLoading: false, User: body, id: body.id });
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
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
    };
    console.log(data);
    e.preventDefault();
    // console.log(this.state);
    var config = {
      headers: {
        "Access-Control-Allow-Origin": true,
        "Access-Control-Allow-Methods": "OPTIONS,GET,PUT,POST,DELETE",
        "Access-Control-Allow-Headers": "X-Requested-With, Content-Type",
        Authorization: AuthenticationService.getToken()
      },
    };
    axios
      .put(`http://localhost:8080/users/${this.state.id}`, data, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const {
      isLoading,
      User,
      firstName,
      lastName,
      description,
      email,
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
                  Edit Your Profile
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
                            <Form.Group as={Col} controlId="formFirstName">
                              <Form.Label>First Name</Form.Label>
                              <Form.Control
                                type="text"
                                name="firstName"
                                placeholder={User.firstName}
                                value={firstName}
                                onChange={this.changeHandler}
                              />
                            </Form.Group>
                            </Form.Row>
                            <Form.Row>
                            <Form.Group as={Col} controlId="formLastName">
                              <Form.Label>Last Name</Form.Label>
                              <Form.Control
                                type="text"
                                name="lastName"
                                placeholder={User.lastName}
                                value={lastName}
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
                            <Form.Group as={Col} controlId="formEmail">
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                type="email"
                                name="email"
                                placeholder={User.email}
                                value={email}
                                onChange={this.changeHandler}
                              />
                            </Form.Group>
                         
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
                          </Form.Row>
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

export default EditUser;
