import React from 'react';
import { useQuery } from '@apollo/react-hooks'; // allows us to make requests to the graphQL server we connected to and made available to the application using the <ApolloProvider> component in App.js
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';
import ThoughtList from '../components/ThoughtList';
import FriendList from '../components/FriendList';
import ThoughtForm from '../components/ThoughtForm';
import Auth from '../utils/auth';

const Home = () => {

  const loggedIn = Auth.loggedIn();
  // stores data returned from server as QUERY_THOUGHTS
  const { loading, data } = useQuery(QUERY_THOUGHTS); 
  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  const thoughts = data?.thoughts || []; // using optional chaining to check if object exists before accessing its properties
  console.log(thoughts);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        {loggedIn && (
          <div className='col-12 mb-3'>
            <ThoughtForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title='Some Feed for Thought(s)...' />
          )}
          </div>
          {loggedIn && userData ? (
            <div className='col-12 col-lg-3 mb-3'>
              <FriendList
                username={userData.me.username}
                friendCount={userData.me.friendCount}
                friends={userData.me.friends}
              />
            </div>
          ) : null}
      </div>
    </main>
  );
};

export default Home;
