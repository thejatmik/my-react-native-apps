import React from 'react'
import {TextInput, View} from 'react-native'
import { styles } from '../styles'
import { useSelector, useDispatch } from 'react-redux'
import { SET_PLAYER_BOARD } from '../store/actions'

function ColInRow({ rowNum, colNum }) {
  const dispatch = useDispatch()
  const gameBoard = useSelector(state => state.gameBoard)
  const playerBoard = useSelector(state => state.playerBoard)

  function handleOnTextChange(row, col, val) {
    if (Number(val) && Number(val) < 10) {
      let newPlayerBoard = [...playerBoard];
      newPlayerBoard[row][col] = Number(val) + 0 || 0;
      dispatch(SET_PLAYER_BOARD(newPlayerBoard))
    }
  }

  return (
    <View style={ [styles.colInRowLine, ( colNum % 3 === 2 ? styles.colBoldLine : styles.colRegularLine )] }>
      <TextInput
        value={ gameBoard[rowNum][colNum] === 0 ? playerBoard[rowNum][colNum].toString() : gameBoard[rowNum][colNum].toString() }
        style={ [ styles.inputCell, (gameBoard[rowNum][colNum] === 0 ? styles.bgWhite : styles.bgMagenta )] }
        maxLength={ 1 }
        selectTextOnFocus
        onChangeText={ text => { handleOnTextChange(rowNum, colNum, text) } }
        editable={ gameBoard[rowNum][colNum] === 0 }
      ></TextInput>
    </View>
  )
}

export default ColInRow;