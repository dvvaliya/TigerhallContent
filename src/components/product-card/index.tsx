import { Card, Image } from '@rneui/themed'
import { Text, View } from 'react-native'

import React from 'react'
import { styles } from './style'

export const ProductCard: React.FC<{
  title: string
  subTitle?: string
  description?: string
  image: string
  footerLabel?: string
}> = ({ title, subTitle, description, image, footerLabel }) => {
  return (
    <Card containerStyle={styles.card}>
      <Image resizeMode='contain' style={styles.image} source={{ uri: image }} />
      <View style={styles.detailContainer}>
        <Text style={styles.title}>{title}</Text>
        {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
        {description && 
        description.map(value => 
        <Text key={value.name} style={styles.description}>{value.name}</Text> )}
        {footerLabel && <Text style={styles.footerLabel}>{footerLabel}</Text>}
      </View>
    </Card>
  )
}
