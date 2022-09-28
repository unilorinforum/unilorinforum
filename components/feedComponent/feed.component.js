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

      <div className=' flex flex-col items-center justify-center '>
        {topics.map((topic) => {
          return (
            <div key={topic.topic_id}>
              <TopicCardComponent topic={topic} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeedComponent;
