import React from 'react';
// importing the useQuery hook from Apollo Client -> allows us to make requests to the GraphQL server
import { useQuery } from "@apollo/client";
import { QUERY_THOUGHTS } from '../utils/queries';
import ThoughtList from "../components/ThoughtList";

const Home = () => {
  // Use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  // Syntax = optional chaining -> negates the need to check if an object even exists before accessing its properties
  const thoughts = data?.thoughts || []; // if data exists store it in thoughts constant, if undefined save an empty array
  console.log(thoughts);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..."/>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
