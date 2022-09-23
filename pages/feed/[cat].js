import React from 'react';
import { Router, useRouter } from 'next/router';
import axios from 'axios';
import TopicCardComponent from '../../components/topicCardComponent/topicCard.component';
import TopicFilterComponent from '../../components/topicFilterComponent/topicFilter.component';
import FeedComponent from '../../components/feedComponent/feed.component';

const Feed = ({ topics }) => {
  const router = useRouter();
  const cat = router.query.cat;
  if (!topics) {
    return '404';
  } else {
    return (
      <div>
        <FeedComponent key={topics.topic_id} topics={topics} />
      </div>
    );
  }
};

export default Feed;

export async function getServerSideProps(context) {
  const response = await fetch(
    `${process.env.API_PATH}/api/topics/category/${context.params.cat}`
  );

  return {
    props: {
      topics: response.data,
      // userData: userResponse.data,
    },
  };
}
