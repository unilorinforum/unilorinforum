import React, { Component } from 'react';
import BannerComponent from '../components/bannerComponent/banner.component';
import TopicCardComponent from '../components/topicCardComponent/topicCard.component';
import { FaFire } from 'react-icons/fa';
import TopicFilterComponent from '../components/topicFilterComponent/topicFilter.component';

export default class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div className=''>
        <div>
          <TopicFilterComponent />
        </div>

        <div className=' grid grid-cols-1 md:grid-cols-2 content-center justify-items-center '>
          <TopicCardComponent />
          <TopicCardComponent />
          <TopicCardComponent />
          <TopicCardComponent />
          <TopicCardComponent />
          <TopicCardComponent />
          <TopicCardComponent />
          <TopicCardComponent />
        </div>
      </div>
    );
  }
}
