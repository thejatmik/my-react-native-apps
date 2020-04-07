import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { styles } from '../styles'
import SudokuBoard from '../components/SudokuBoard'

function Game() {
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
  return (
    <View style={ styles.mainContainer }>
      <Text style={ styles.boardTitle }>Go Commit Sudoku</Text>
      <SudokuBoard emptyBoard={ emptyBoard } />
    </View>
  )
}

export default Game;