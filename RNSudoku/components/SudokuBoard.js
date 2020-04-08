import React, { useEffect } from 'react'
import { View, Button, Text } from 'react-native'
import Row from './Row'
import { styles } from '../styles'
import { useSelector, useDispatch } from 'react-redux'
import { fetchGameBoard, checkSolved, getSolved, submitBoard } from '../store/actions'
import Loading from '../screens/Loading'
import GameModal from './GameModal'

function SudokuBoard({ emptyBoard, navigation }) {
  const playerBoard = useSelector(state => state.playerBoard)
  const gameBoard = useSelector(state => state.gameBoard)
  const checkMessage = useSelector(state => state.checkMessage)
  const boardLoading = useSelector(state => state.boardLoading)
  const screenLoading = useSelector(state => state.screenLoading)
  const difficulty = useSelector(state => state.difficulty)
  const replaying = useSelector(state => state.replaying)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({
      type: "SET_SCREEN_LOADING_STATE",
      payload: true
    })
    dispatch(fetchGameBoard(difficulty))
  }, [dispatch, difficulty])
  if (replaying) {
    dispatch({
      type: "SET_SCREEN_LOADING_STATE",
      payload: true
    })
    dispatch(fetchGameBoard(difficulty))
    dispatch({
      type: "SET_REPLAYING",
      payload: false
    })
  }
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
    dispatch({
      type: "SET_CHECK_MESSAGE",
      payload: ''
    })
  }
  function handleReset() {
    const newPlayerBoard = gameBoard.map(item => {
      return [...item]
    })
    dispatch({
      type: "SET_PLAYER_BOARD",
      payload: newPlayerBoard
    })
    dispatch({
      type: "SET_CHECK_MESSAGE",
      payload: ''
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
        <GameModal navigation={ navigation }/>
        <View style={styles.boardContainer}>
          { boardLoading ? <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text>Loading</Text></View> : rows }
        </View>
        <View style={{flexDirection:'row'}}>
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
        </View>
        <View style={{flexDirection:'row'}}>
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
        </View>
        <Text>{ checkMessage }</Text>
      </>
    )
  }
}

export default SudokuBoard;