import React, { Component } from 'react';
import FeedComponent from '../components/feedComponent/feed.component';

export default class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div className=''>
       <FeedComponent />
      </div>
    );
  }
}
