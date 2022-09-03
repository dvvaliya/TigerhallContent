import Colors from '@styles/colors'
import { NavigationContainer } from '@react-navigation/native'
import { ProductsListScreen } from '@containers'
import { ROUTES } from '@constants'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{
          contentStyle: { backgroundColor: Colors.darkTeal },
        }}>
        {/* Note: if more than one screen add them into stack and assigned stack below */}
        <Stack.Screen
          name={ROUTES.PRODUCTS_LIST_SCREEN}
          component={ProductsListScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
