import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native'

import React from 'react'

const App = () => {
  const isDarkMode = useColorScheme() === 'dark'

  const client = new ApolloClient({
    uri: 'https://api.staging.tigerhall.io/graphql',
    cache: new InMemoryCache(),
  })

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ApolloProvider client={client}>
      </ApolloProvider>
    </SafeAreaView>
  )
}

export default App
