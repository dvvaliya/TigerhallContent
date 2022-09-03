import { FlatList, View } from 'react-native'
import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'

import Colors from '@styles/colors'
import { ProductCard } from '@components'
import { SearchBar } from '@rneui/themed'
import Spinner from 'react-native-loading-spinner-overlay'
import Strings from '@constants/strings'
import { Text } from '@rneui/base'
import { debounce } from '@helpers'
import { globalStyle } from '@styles'
import { styles } from './style'

export const ProductsListScreen: React.FC = () => {
  const [search, setSearch] = useState('')
  const [limit, setLimit] = useState(5); //for initial numbers of result to render

  const PRODUCTS = gql`
    query getProducts($keywords: String,$offset: Int, $limit: Int) {
      contentCards(filter: { limit: $limit, offset:$offset, keywords: $keywords, types: [PODCAST] }) {
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

  const { loading, error, data, refetch, fetchMore } = useQuery(PRODUCTS, {
    variables: { search, offset:0, limit},
  })

  // for loading animation while scrolling to the last record
  if (loading) return  <Spinner
  animation='fade'
  visible={loading}
  color={Colors.tigerHallOrange}
  overlayColor={Colors.tigerHallTeal}
  textContent={Strings.LOADING}
  textStyle={globalStyle.spinnerTextStyle}
/>;
  if (error) return <Text>Error :(</Text>;


  var returnedFunction = debounce(function (search: string) {
    // To only call refetch if user types or search anything
    if (search.length > 0) refetch({ keywords: search })
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
        contentContainerStyle={styles.contentContainer}
        data={data?.contentCards?.edges || []}
        onEndReached={() => {
          const currentLength = data?.contentCards?.edges?.length; // Gives cached result
          fetchMore({
            variables: {
              offset: currentLength,
              limit: limit, 
            },
          }).then(fetchMoreResult => {
            // Update variables.limit for the original query to include
            // the newly added edges items.
            setLimit(currentLength + fetchMoreResult.data?.contentCards?.edges?.length);
          });
        }
        }
        renderItem={({ item }) => (
          <ProductCard
            key={item.name}
            title={item.experts[0].firstName + ' ' + item.experts[0].lastName}
            subTitle={item.name}
            description={item.categories}
            image={item.image.uri}
            footerLabel={item.experts[0].company}
          />
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  )
}
