import React from 'react';
import TopicFilterComponent from '../topicFilterComponent/topicFilter.component';

const NoTopicFoundComponent = ({ message }) => {
  return (
    <div>
      <TopicFilterComponent />
      <div className='bg-[#e20808] h text-[#fff]'>{message} No post foun</div>
    </div>
  );
};

export default NoTopicFoundComponent;
