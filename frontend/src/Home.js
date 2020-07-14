import React, { Component } from "react";
import AuthenticationService, { USER_NAME_SESSION_ATTRIBUTE_NAME } from "./service/AuthenticationService.js";
import AppNav from "./AppNav.js";
import axios from 'axios';

class Home extends Component {
    state = {
      isLoggedIn:false
    };

    async componentDidMount() {
      // var user = AuthenticationService.getLoggedInUserName();
      AuthenticationService.setUpRoles(sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME));
      console.log(sessionStorage.getItem("roles"));
      console.log(AuthenticationService.getRoles());
      var config = {
        headers: {
          "Access-Control-Allow-Origin": true,
          "Access-Control-Allow-Methods": "OPTIONS,GET,PUT,POST,DELETE",
          "Access-Control-Allow-Headers": "X-Requested-With, Content-Type",
          "Authorization": AuthenticationService.getToken(),
        },
      };
      axios
        .get(`http://localhost:8080/users/email/${sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)}`, config)
        .then((user) => {
          sessionStorage.setItem("userId", user.data.id);
          console.log(user.data.id);
        });
        this.setState({isLoggedIn:AuthenticationService.isUserLoggedIn()});
    }

    render() {
        const{isLoggedIn} = this.state;
        console.log(this.state);
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
                      Welcome to eAROjobs!			
                    </h1>	
                  </div>											
                </div>
              </div>
            </section>
            {/* End banner Area */}	
            {/* Start blog-posts Area */}
            <section className="callto-action-area section-gap">
          { !isLoggedIn ? <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="menu-content col-lg-9">
                <div className="title text-center">
                  <h1 className="mb-10 text-white">Join us today without any hesitation</h1>
                  <a className="primary-btn" href="/signup">Sign Up</a>
                  
                </div>
              </div>
            </div>	
        </div>	: null}
        </section>
            {/* End blog-posts Area */}
            {/* start footer Area */}		
            <footer className="footer-area section-gap">
          <div className="container">
            <div className="row">
              <div className="col-lg-6  col-md-12">
                <div className="single-footer-widget newsletter">
                  <h6>Feedback</h6>
                  <p>You can send me your opinion regarding this app</p>
                  <div id="mc_embed_signup">
                    <form target="_blank" noValidate="true" action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&id=92a4423d01" method="get" className="form-inline">
                      <div className="form-group row" style={{width: '100%'}}>
                        <div className="col-lg-8 col-md-12">
                          <input name="EMAIL" placeholder="Enter Email" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Email '" required type="email" />
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
            <div className="row footer-bottom d-flex justify-content-between">
              <p className="col-lg-8 col-sm-12 footer-text m-0 text-white">
                
              </p>
              
            </div>
          </div>
        </footer>
            {/* End footer Area */}		
          </div>
            
        );
    }
}

export default Home;