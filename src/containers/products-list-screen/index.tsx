import { FlatList, View } from 'react-native'
import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'

import { ProductCard } from '@components'
import { SearchBar } from '@rneui/themed'
import Strings from '@constants/strings'
import { Text } from '@rneui/base'
import { debounce } from '@helpers'
import { globalStyle } from '@styles'
import { styles } from './style'

export const ProductsListScreen: React.FC = () => {
  const [search, setSearch] = useState('')

  const PRODUCTS = gql`
    query getProducts($keywords: String) {
      contentCards(filter: { limit: 20, keywords: $keywords, types: [PODCAST] }) {
        edges {
          ... on Podcast {
            name
            image {
              uri
            }
            categories {
              name
            }
            experts {
              firstName
              lastName
              title
              company
            }
          }
        }
        meta {
          total
          limit
          offset
        }
      }
    }
  `

  const { loading, error, data, refetch } = useQuery(PRODUCTS, {
    variables: { search },
    pollInterval: 3000,
  })

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  var returnedFunction = debounce(function (search: string) {
    refetch({ keywords: search })
  }, 3000)

  return (
    <View style={globalStyle.flex1}>
      <SearchBar
        containerStyle={styles.container}
        inputContainerStyle={styles.inputContainer}
        placeholder={Strings.SEARCH_PLACEHOLDER}
        onCancel={search => setSearch(search)}
        onChangeText={search => {
          setSearch(search)
          returnedFunction(search)
        }}
        value={search}
      />
      <FlatList
        contentContainerStyle={{ paddingBottom: 10 }}
        data={data?.contentCards?.edges}
        renderItem={({ item }) => (
          <ProductCard
            title={item.experts[0].firstName + ' ' + item.experts[0].lastName}
            subTitle={item.name}
            description={item.experts[0].title}
            image={item.image.uri}
            footerLabel={item.experts[0].company}
          />
        )}
      />
    </View>
  )
}
