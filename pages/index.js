import Head from 'next/head';
import axios from 'axios';
import FeedComponent from '../components/feedComponent/feed.component';

export default function Home({ topics }) {
  return (
    <div>
      <Head></Head>

      <main className=''>
        <FeedComponent key={topics.topic_id} topics={topics} />
      </main>

      <footer></footer>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await axios(`${process.env.API_PATH}/api/topics`);

  return {
    props: {
      topics: response.data,
    },
  };
}
