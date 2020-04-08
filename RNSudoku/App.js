import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { reducers } from './store/reducers'
import { styles } from './styles'
import Game from './screens/Game'
import Landing from './screens/Landing'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Finish from './screens/Finish'

const store = createStore(reducers, applyMiddleware(thunk))
const Stack = createStackNavigator()

export default function Sudoku() {
  // gameBoard jadi kunci jawaban
  // playerBoard buat nampung input
  return (
    <Provider store={ store }>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="Game" component={ Game } options={{ headerShown:false }}/>
          <Stack.Screen name="Finish" component={ Finish } />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}