import React from 'react';
import TopicCardComponent from '../topicCardComponent/topicCard.component';
import TopicFilterComponent from '../topicFilterComponent/topicFilter.component';
import axios from 'axios';

const FeedComponent = ({ topics }) => {
  // console.log(topics);
  return (
    <div>
      <div>
        <TopicFilterComponent />
      </div>

      <div className=' grid grid-cols-1 md:grid-cols-2 content-center justify-items-center '>
        {topics.map((topic) => {
          return (
            <div key={topic.topic_id}>
              <TopicCardComponent key={topic.id} topic={topic} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeedComponent;
