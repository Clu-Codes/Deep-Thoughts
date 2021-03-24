import React from 'react';
import { useQuery } from '@apollo/react-hooks'; // allows us to make requests to the graphQL server we connected to and made available to the application using the <ApolloProvider> component in App.js
import { QUERY_THOUGHTS } from '../utils/queries';
import ThoughtList from '../components/ThoughtList';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS); // stores data returned from server as QUERY_THOUGHTS

  const thoughts = data?.thoughts || []; // using optional chaining to check if object exists before accessing its properties
  console.log(thoughts);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title='Some Feed for Thought(s)...' />
          )}
          </div>
      </div>
    </main>
  );
};

export default Home;
