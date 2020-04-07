import React, { useEffect } from 'react'
import { View, Button } from 'react-native'
import Row from './Row'
import { styles } from '../styles'
import { useSelector, useDispatch } from 'react-redux'
import { fetchGameBoard } from '../store/actions'

function SudokuBoard({ emptyBoard }) {
  const playerBoard = useSelector(state => state.playerBoard)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchGameBoard())
  }, [])
  const rows = emptyBoard.map((item, index) => {
    return (
      <Row 
        key={ index }
        line={ item }
        rowNum={ index }
      ></Row>
    )
  })

  function handleOnPress() {
    const strBoard = playerBoard.map(line => {
      strLine = line.join(' ')
      // strLine += "\n"
      return strLine
    })
    console.log(strBoard)
  }
  return (
    <>
      <View style={styles.boardContainer}>
        { rows }
      </View>
      <Button
        onPress={ handleOnPress }
        title="Submit"
        color="#841584"
      />
    </>
  )
}

export default SudokuBoard;