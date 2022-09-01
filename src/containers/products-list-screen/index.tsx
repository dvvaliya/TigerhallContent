import React, { useState } from 'react'

import { SearchBar } from "@rneui/themed";
import Strings from '@constants/strings';
import { View } from 'react-native'
import { globalStyle } from '@styles'
import { styles } from './style';

export const ProductsListScreen: React.FC = () => {
    const [search, setSearch] = useState("");
    const updateSearch = (search) => {
        setSearch(search);
      };

    return(
    <View style={globalStyle.flex1}>
        <SearchBar
        containerStyle={styles.container}
        inputContainerStyle={styles.inputContainer}
        placeholder={Strings.SEARCH_PLACEHOLDER}
        onChangeText={updateSearch}
        value={search}
        />
    </View>
    )
}