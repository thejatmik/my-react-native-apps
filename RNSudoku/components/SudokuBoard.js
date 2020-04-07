import React, { useEffect } from 'react'
import { View, Button, Text } from 'react-native'
import Row from './Row'
import { styles } from '../styles'
import { useSelector, useDispatch } from 'react-redux'
import { fetchGameBoard, checkSolved, getSolved, submitBoard } from '../store/actions'
import Loading from '../screens/Loading'
import GameModal from './GameModal'

function SudokuBoard({ emptyBoard }) {
  const playerBoard = useSelector(state => state.playerBoard)
  const gameBoard = useSelector(state => state.gameBoard)
  const checkMessage = useSelector(state => state.checkMessage)
  const boardLoading = useSelector(state => state.boardLoading)
  const screenLoading = useSelector(state => state.screenLoading)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({
      type: "SET_SCREEN_LOADING_STATE",
      payload: true
    })
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

  function handleSubmit() {
    dispatch(submitBoard(playerBoard))
  }
  function handleReset() {
    const newPlayerBoard = gameBoard.map(item => {
      return [...item]
    })
    dispatch({
      type: "SET_PLAYER_BOARD",
      payload: newPlayerBoard
    })
  }
  function handleCheck() {
    dispatch(checkSolved(playerBoard))
  }
  function handleSolve() {
    // console.log()
    dispatch(getSolved((gameBoard)))
  }
  function handleNewBoard() {
    dispatch(fetchGameBoard())
  }
  if (screenLoading) {
    return (
      <Loading/>
    )
  } else {
    return (
      <>
        <GameModal />
        <View style={styles.boardContainer}>
          { boardLoading ? <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text>Loading</Text></View> : rows }
        </View>
        <Button
          onPress={ handleSubmit }
          title="Submit"
          color="#1a1"
        />
        <Button
          onPress={ handleCheck }
          title="Check"
          color="#11a"
        />
        <Button
          onPress={ handleSolve }
          title="Solve"
          color="#f5f"
        />
        <Button
          onPress={ handleReset }
          title="Reset"
          color="#d11"
        />
        <Button
          onPress={ handleNewBoard }
          title="Load New Board"
          color="#999"
        />
        <Text>{ checkMessage }</Text>
      </>
    )
  }
}

export default SudokuBoard;