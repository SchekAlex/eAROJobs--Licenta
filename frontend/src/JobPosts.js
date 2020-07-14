import React, {Component} from 'react';
import AuthenticationService from "./service/AuthenticationService";

import AppNav from './AppNav'
class JobPosts  extends Component{
    state = {
         isLoading:true,
         JobPosts: [],
         isRecruiter: false
    }

  async componentDidMount() {
    const response = await fetch('/jobposts');
    const body = await response.json();
    this.setState({ JobPosts: body, isLoading: false, isRecruiter: AuthenticationService.isRecruiter() });
  }

  render() {
    const { JobPosts, isLoading, isRecruiter } = this.state;
    if (isLoading)
      return (<div>Loading...</div>);
  
    return (
      <div>
             <div>
        <AppNav />
        {/* start banner Area */}
        <section className="callto-action-area section-gap" id="home">
          <div className="overlay overlay-bg" />
          <div className="container">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="about-content col-lg-12">
                <h1 className="text-white">
                  Job Posts
                </h1>
                <p className="text-white link-nav"><a href="/">Home </a>  <span className="lnr lnr-arrow-right" />  <a href="/jobposts"> Job Posts</a></p>
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
               { JobPosts.map(jobpost => (
               <div className="single-post d-flex flex-row justify-content-center" key={jobpost.id}>
                  <div className="details">
                    <div className="title-post d-flex flex-row justify-content-between">
                      <div className="titles">

                        
                        				

                        <a href={"/jobposts"}><h4>{jobpost.title}</h4></a>					
                        <h6>Electronic Arts Inc.</h6>	
                      <h5>Job Nature: {jobpost.jobType}</h5>

                      <p className="address"><span className="lnr lnr-database" /> Estimated salary: {jobpost.revenue}</p>
                      <a class="genric-btn info-border circle" href={"/jobposts/" + jobpost.id} >More Info</a>
                      {isRecruiter ? <a class="genric-btn info-border circle" href={"/interviews/job-post/" + jobpost.id} >See Interview</a> : null}
                        				

                      </div>
                    </div>

                   


                  </div>
                </div>
                ))
                }
              </div>
            </div>
          </div>
          
        </section>
        {/* End post Area */}
        {/* Start callto-action Area */}

        
        {/* End calto-action Area */}			
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
      // </div>
    );

  }
}

export default JobPosts;