import React from 'react';
import axios from 'axios';
import FeedComponent from '../../components/feedComponent/feed.component';
import { trimContent, getUserInfo } from '../../functions';

const Feed = ({ topics }) => {
  return (
    <div>
      <FeedComponent key={topics.topic_id} topics={topics} />
    </div>
  );
};

export default Feed;
export async function getServerSideProps() {
  const response = await axios(`${process.env.API_PATH}/api/topics`);
  

  return {
    props: {
      topics: response.data,
    },
  };
}
