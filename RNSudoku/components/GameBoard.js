import React, { useState } from 'react'
import { Text, View, KeyboardAvoidingView, Platform } from 'react-native'
import SudokuBoard from './SudokuBoard'
import { styles } from '../styles'
import { useSelector } from 'react-redux'

function GameBoard({ navigation }) {
  const difficulty = useSelector(state => state.difficulty)
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
  const difficultyMessage = String(difficulty).toUpperCase() || ''
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.Os == "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={ styles.mainContainer }>
          <Text style={ styles.boardTitle }>Go Commit Sudoku - { difficultyMessage }</Text>
          <SudokuBoard emptyBoard={ emptyBoard } navigation={ navigation }/>
        </View>
      </KeyboardAvoidingView>
    </>
  )
}

export default GameBoard;