import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { styles } from '../styles'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import GameBoard from '../components/GameBoard'
import GameSettings from '../components/GameSettings'
import { MaterialCommunityIcons } from '@expo/vector-icons'
// checkerboard, cogs
const Tab = createBottomTabNavigator()

function Game() {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Board') {
              iconName = 'checkerboard'
            } else if (route.name === 'Settings') {
              iconName = 'cogs'
            }
            return <MaterialCommunityIcons
              name={iconName}
              size={size} 
              color={color}
            />
          }
        })}
        tabBarOptions={{
          activeBackgroundColor: 'black',
          inactiveBackgroundColor: 'white'
        }}
      >
        <Tab.Screen name="Board" component={GameBoard} />
        <Tab.Screen name="Settings" component={GameSettings} />
      </Tab.Navigator>
    </>
  )
}

export default Game;