import React from 'react';
import { Router, useRouter } from 'next/router';
import axios from 'axios';
import TopicCardComponent from '../../components/topicCardComponent/topicCard.component';
import TopicFilterComponent from '../../components/topicFilterComponent/topicFilter.component';
import FeedComponent from '../../components/feedComponent/feed.component';
import NoTopicFoundComponent from '../../components/topicCardComponent/noTopicFound.component';

const Feed = ({ topics }) => {
  const router = useRouter();
  const cat = router.query.cat;
  if (topics.success == 0) {
    return <NoTopicFoundComponent message={topics.message} />;
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
  const response = await axios(`/topics/category/${context.params.cat}`);
  console.log('data', response.data.topics);

  return {
    props: {
      topics: response.data.topics,
      // userData: userResponse.data,
    },
  };
}
