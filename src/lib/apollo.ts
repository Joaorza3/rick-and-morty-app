import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'

const apolloClient = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_API_URL,
  cache: new InMemoryCache(),
})

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})

export { apolloProvider, apolloClient }
