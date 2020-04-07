import React, {useState, useEffect} from 'react'
import { Text, View, Button } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { reducers } from './store/reducers'
import { styles } from './styles'
import SudokuBoard from './components/SudokuBoard'

const store = createStore(reducers, applyMiddleware(thunk))

export default function Sudoku() {
  const [emptyBoard, setGameBoard] = useState([
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
  ])
  // gameBoard jadi kunci jawaban
  // playerBoard buat nampung input
  return (
    <Provider store={ store }>
      <View style={ styles.mainContainer }>
        <Text style={ styles.boardTitle }>Go Commit Sudoku</Text>
        <SudokuBoard emptyBoard={ emptyBoard } />
      </View>
    </Provider>
  )
}