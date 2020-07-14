import React, {Component} from 'react';
import JobPosts from './JobPosts';
import Home from './Home';
import CVs from './CV/CVs';
import CV from './CV/CV';
import EditCV from './CV/EditCV';
import JobPostCVs from './CV/JobPostCVs';
// import LoginPage from './Login/LoginPage';
import JobPost from './JobPost';
import EditUser from './User/EditUser';
import Reviews from './Review/Reviews';
import {Route, BrowserRouter as Router,Switch} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import LoginComponent from './Login/LoginPage';
import LogoutComponent from './Login/LogoutPage';
import SignUpComponent from './Login/SignUpPage';
import AuthenticatedRoute from './Login/AuthenticatedRoute';
import NonAuthenticatedRoute from './Login/NonAuthenticatedRoute';
import AdminRoute from './Login/AdminRoute';
import RecruiterRoute from './Login/RecruiterRoute';
import Admin from './Admin';
import WriteReview from './WriteReview';

import Interviews from './Interviews/Interviews';
import EmployeeRoute from './Login/EmployeeRoute';

class App extends Component {
    state = {}
    
      
      
    render (){
        return ( 
            <Router>
                <Switch>
                    <Route path='/jobposts' exact={true} component={JobPosts}/>
                    <AuthenticatedRoute path="cvs/email/:email" component={CV}/>
                    <RecruiterRoute path='/cvs' exact={true} component={CVs}/>
                    <AuthenticatedRoute path="/cvs/email/:email" exact={true} component={CV} />
                    <AuthenticatedRoute path="/cvs/users/:id" exact={true} component={CV} />
                    <AuthenticatedRoute path="/cvs/:email/edit" exact={true} component={EditCV} />
                    <EmployeeRoute path="/jobposts/:id/cvs" exact={true} component={JobPostCVs} />
                    <Route path='/' exact={true} component={Home}/>
                    {/* <Route path='/login/loginpage' exact={true} component={LoginPage}/> */}
                    <Route path="/jobposts/:id" exact={true} component={JobPost} />
                    <RecruiterRoute path="/reviews/users/:id" exact={true} component={Reviews} />
                    <AuthenticatedRoute path="/users/:id/edit" exact={true} component={EditUser} />
                    <NonAuthenticatedRoute path="/login" exact={true} component={LoginComponent} />
                    <AuthenticatedRoute path="/logout" exact={true} component={LogoutComponent} />
                    <AuthenticatedRoute path="/reviews/addreview/:id" exact={true} component={WriteReview} />
                    <NonAuthenticatedRoute path="/signUp" exact={true} component={SignUpComponent} />
                    <AdminRoute path="/admin" exact={true} component={Admin}/>
                    <RecruiterRoute path="/interviews/job-post/:id" exact={true} component={Interviews} />
                </Switch>
            </Router>
        );
    }
}
export default App;