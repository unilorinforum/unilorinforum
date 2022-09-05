import React from 'react';
import TopicCardComponent from '../topicCardComponent/topicCard.component';
import TopicFilterComponent from '../topicFilterComponent/topicFilter.component';

const FeedComponent = () => {
  return (
    <div>
      <div>
        <TopicFilterComponent  />
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
        <TopicCardComponent />
        <TopicCardComponent />
        <TopicCardComponent />
        <TopicCardComponent />
        <TopicCardComponent />
        <TopicCardComponent />
      </div>
    </div>
  );
};

export default FeedComponent;
