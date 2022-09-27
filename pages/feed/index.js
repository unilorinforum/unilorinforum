import React from 'react';
import axios from 'axios';
import FeedComponent from '../../components/feedComponent/feed.component';
import { trimContent, getUserInfo } from '../../functions';

const Feed = ({ topics }) => {
  return (
    <div className='pb-[68px]'>
      <FeedComponent key={topics.topic_id} topics={topics} />
    </div>
  );
};

export default Feed;
export async function getServerSideProps() {
  const response = await axios(`/topics`);
  // console.log(response.data.topics);

  return {
    props: {
      topics: response.data.topics,
    },
  };
}
