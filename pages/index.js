import Head from 'next/head';
import axios from 'axios';
import FeedComponent from '../components/feedComponent/feed.component';

export default function Home({ topics }) {
  return (
    <div>
      <Head></Head>

      <main className=''>
        <div></div>
        <FeedComponent key={topics.topic_id} topics={topics} />
      </main>

      <footer></footer>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await axios(`/topics`);
  // console.log(response.data.topics);

  return {
    props: {
      topics: response.data.topics,
    },
  };
}
