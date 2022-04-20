import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';

// Est a new link to GraphQL server
const httpLink = createHttpLink({
  uri: '/graphql',
});

// ApolloClient constructor to instantiate the Apollo Client instance and create connection to API endpoint
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(), // instantiate new cache new InMemoryCache
});

function App() {
  return (
    <ApolloProvider client={ client }>
    <div className='flex-column justify-flex-start min-100-vh'>
      <Header />
      <div className='container'>
        <Home />
      </div>
      <Footer />
    </div>
    </ApolloProvider>
  );
}

export default App;
