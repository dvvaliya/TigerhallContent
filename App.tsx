import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native'

import { AppNavigator } from '@navigation'
import React from 'react'
import { globalStyle } from '@styles'

const App = () => {
  const isDarkMode = useColorScheme() === 'dark'

  const client = new ApolloClient({
    uri: 'https://api.staging.tigerhall.io/graphql',
    cache: new InMemoryCache(),
  })

  return (
    <SafeAreaView style={globalStyle.flex1}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ApolloProvider client={client}>
        <AppNavigator/>
      </ApolloProvider>
    </SafeAreaView>
  )
}

export default App
