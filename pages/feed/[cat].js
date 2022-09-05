import React from 'react';
import { Router, useRouter } from 'next/router';
import TopicCardComponent from '../../components/topicCardComponent/topicCard.component';
import TopicFilterComponent from '../../components/topicFilterComponent/topicFilter.component';

const Feed = () => {
    const router = useRouter()
    const cat =  router.query.cat

  return (
    <div>
      <div>
        <h1>{cat}</h1>
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

export default Feed;
