import React, { Component } from "react";
import AuthenticationService from "../service/AuthenticationService.js";
import AppNav from "../AppNav.js";

class CVs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CVs: [],
      isLoading: true,
      //   User: {},
    };
  }

  async componentDidMount() {
    const response = await fetch("http://localhost:8080/cvs");
    const body = await response.json();
    this.setState({ CVs: body, isLoading: false });
  }
  render() {
    const { isLoading, CVs } = this.state;
    console.log(AuthenticationService.getRoles());
    if (isLoading) {
      return <div>Loading...</div>;
    }
    var loggedInUser;
            if (AuthenticationService.isUserLoggedIn() && AuthenticationService.isRecruiter()) {
                loggedInUser = "Review candidate";
            } else {
                loggedInUser = "";
            }
    return (
      <div>
      
             
                
            
         <AppNav/> 
        
        {/* start banner Area */}
        <section className="callto-action-area section-gap" id="home">
          <div className="overlay overlay-bg" />
          <div className="container">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="about-content col-lg-12">
                <h1 className="text-white">
                  CV's
                </h1>
                <p className="text-white link-nav"><a href="/">Home </a>  <span className="lnr lnr-arrow-right" />  <a href="/cvs"> CV's</a></p>
              </div>
            </div>
          </div>
        </section>
        {/* End banner Area */}
        {/* Start post Area */}
        <section className="callto-action-area section-gap">
          <div className="container">
            <div className="row justify-content-center d-flex">
              <div className="col-lg-8 post-list">
                      <div>
                        <div>
                          {CVs.map((CV) => (
                            <div className="single-post d-flex flex-row justify-content-center" key={CV.id}>
                                <div className="details">
                                  <div className="title-post d-flex flex-row justify-content-between">
                                    <div className="title">
                                        <h5>{CV.user.firstName} {CV.user.lastName} CV: </h5>
                                        
                                        <p>Education: {CV.education}</p>
                                        <p>Skills: {CV.skills}</p>
                                        <p>Description: {CV.description}</p>
                                        <p>Experience : </p>
                                        {CV.experience.map((experience) => (
                                          <li key={experience.id}>{experience.companyName}</li>
                                        ))}
                                        
                                        <a href={"/cvs/email/"+ CV.user.email} class="genric-btn success-border circle arrow">More Info</a>
                                    </div>
                                </div>
                            </div>
                          </div>
                          ))}
                        </div>
                      </div>
                </div>
            </div>
         </div>
       </section>
      {/* End post Area */}
      {/* start footer Area */}
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
        {/* End footer Area */}
      </div>
    );
  }
}

export default CVs;
