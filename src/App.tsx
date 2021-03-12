import * as React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Products from './Pages/Products';

const client = new ApolloClient({
  uri: 'https://pangaea-interviews.now.sh/api/graphql',
  cache: new InMemoryCache(),
});

export const App = () => (
  <ApolloProvider client={client}>
    <ChakraProvider theme={theme}>
      <Products />
    </ChakraProvider>
  </ApolloProvider>
);
