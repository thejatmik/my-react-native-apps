import React, { useEffect } from 'react'
import { View, Button, Text, StatusBar } from 'react-native'
import Row from './Row'
import { styles } from '../styles'
import { useSelector, useDispatch } from 'react-redux'
import { fetchGameBoard, checkSolved, getSolved, submitBoard, startCountDown } from '../store/actions'
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
  const timer = useSelector(state => state.timer)
  const counter = useSelector(state => state.counter)
  const dispatch = useDispatch()
  StatusBar.setHidden(true)

  useEffect(() => {
    dispatch({
      type: "SET_SCREEN_LOADING_STATE",
      payload: true
    })
    dispatch(fetchGameBoard(difficulty, timer.duration))
    
    // countdwon 
    // dispatch({
    //   type: "SET_COUNTER",
    //   payload: timer.duration
    // })
    // let clock = setInterval(() => {
    //   let now = new Date().getTime()
    //   let distance = now - startMS
    //   dispatch({
    //     type: "DECREASE_COUNTER"
    //   })
    //   console.log(counter)
    //   if ( distance > timer.duration * 1000 ) {
    //     clearInterval(clock)
    //   }
    // }, 1000)
    // dispatch(startCountDown(timer.duration))
  }, [dispatch, difficulty])

  if (replaying) {
    dispatch({
      type: "SET_SCREEN_LOADING_STATE",
      payload: true
    })
    dispatch(fetchGameBoard( difficulty, timer.duration ))
    dispatch({
      type: "SET_REPLAYING",
      payload: false
    })
  }
  if ( counter === 0 && timer.started ) {
    // console.log(timer)
    window.clearInterval(timer.id)
    dispatch({
      type: "STOP_TIMER"
    })
    if ( timer.toggle ) {
      dispatch(submitBoard(playerBoard))
    }
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
  const countdown = (
    <>
      { timer.toggle ? <Text>{ counter }</Text> : <></> }
    </>
  )

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
    dispatch(startCountDown(timer.duration))
  }
  function handleCheck() {
    dispatch(checkSolved(playerBoard))
  }
  function handleSolve() {
    dispatch(getSolved((gameBoard)))
  }
  function handleNewBoard() {
    dispatch(fetchGameBoard( difficulty, timer.duration ))
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
        <View>
          { countdown }
        </View>
        <View style={{flexDirection:'row', paddingTop: 5}}>
          <Button
            onPress={ handleSubmit }
            title="Submit"
            color="#1a1"
          />
          <Text>&nbsp;</Text>
          <Button
            onPress={ handleCheck }
            title="Check"
            color="#11a"
          />
        </View>
        <View style={{flexDirection:'row', paddingTop: 5}}>
          <Button
            onPress={ handleSolve }
            title="Solve"
            color="#f5f"
          />
          <Text>&nbsp;</Text>
          <Button
            onPress={ handleReset }
            title="Reset"
            color="#d11"
          />
          <Text>&nbsp;</Text>
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