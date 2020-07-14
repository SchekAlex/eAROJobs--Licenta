import React, { Component } from "react";

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Reviews: [],
    };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    const response = await fetch(`/reviews/users/${id}`);
    const body = await response.json();
    this.setState({ Reviews: body });
  }

  render() {
    const { Reviews } = this.state;
    return (
      <div>
        {Reviews.map((review) => (
          <div key={review.id}>
            <p>{review.communicationSkills}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Review;
