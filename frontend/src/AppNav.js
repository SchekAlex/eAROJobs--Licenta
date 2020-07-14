import React, {Component} from 'react';
import {
    Navbar,
    Nav,
    NavDropdown,
    FormControl,
    Form,
    Button
   } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import AuthenticationService, { USER_NAME_SESSION_ATTRIBUTE_NAME } from "./service/AuthenticationService.js";

class AppNav extends Component{
    state = {
      isUserLoggedIn: false,
      isRecruiter: false,
      isAdmin: false,
      isCandidate: false
    }

    componentDidMount() {
      this.setState({isUserLoggedIn: AuthenticationService.isUserLoggedIn(),
        isRecruiter: AuthenticationService.isRecruiter(),
        isAdmin: AuthenticationService.isAdmin(),
        isCandidate: AuthenticationService.isCandidate()
      });
    }

    logout = (e) => {
      AuthenticationService.logout();
    }

    render(){
      const {isUserLoggedIn, isAdmin, isRecruiter, isCandidate} = this.state;
      const loggedInUser = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
      return(
        <div>
        <header id="header">
          <div className="container">
            <div className="row align-items-center justify-content-between d-flex">
              <div id="logo">
                <h3 className ="text-white">eAROjobs</h3>
              </div>
              <nav id="nav-menu-container">
                <ul className="nav-menu">
                  <li className="menu-active"><a href="/">Home</a></li>
                  <li className="menu-active"><a href="/jobposts">JobPosts</a></li>
                  { isCandidate ? <li className= "menu-active"><a href={`/cvs/email/${sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)}`}>My CV</a></li> : null}
                  { isAdmin ? <li className= "menu-active"><a href="/admin">Admin Page</a></li> : null}
                  { isRecruiter ? <li className= "menu-active"><a href="/cvs">CV's</a></li> : null}
                  { !isUserLoggedIn ? <li><a className="ticker-btn" href="/signup">Signup</a></li> : null}
                  { !isUserLoggedIn ? <li><a className="ticker-btn" href="/login">Login</a></li> : null}
                  { isUserLoggedIn ? <li ><a className="ticker-btn" href="/logout" onClick={this.logout}>Logout</a></li> : null}
                  { isUserLoggedIn ?
                   <li class="menu-has-children" style={{color:"yellow"}}>{loggedInUser}
                    <ul >
                        <li><a href={`/cvs/${sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)}/edit`}>Edit Your CV</a></li>
                        <li><a href={`/users/${sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)}/edit`}>Edit Your Profile</a></li>
                    </ul>
                  </li> : null}
                </ul>
              </nav>
            </div>
          </div>
        </header>
          </div>
      );
      // var loggedInUser = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
      // console.log(loggedInUser);
      //       if (loggedInUser != null) {
      //           loggedInUser = AuthenticationService.getLoggedInUserName();
      //           console.log(sessionStorage.getItem("roles"));
      //           if(sessionStorage.getItem("roles").includes("Admin")){
      //             return(
      //               <div>
      //               <header id="header">
      //                 <div className="container">
      //                   <div className="row align-items-center justify-content-between d-flex">
      //                     <div id="logo">
      //                       <h3 className ="text-white">eAROjobs</h3>
      //                     </div>
      //                     <nav id="nav-menu-container">
      //                       <ul className="nav-menu">
      //                         <li className="menu-active"><a href="/">Home</a></li>
      //                         <li className="menu-active"><a href="/AdminPage">Admin Page</a></li>
      //                         <li><a className="ticker-btn" href="/signup">Signup</a></li>
     
           
        
    }
}

export default AppNav;