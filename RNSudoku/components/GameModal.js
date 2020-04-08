import React from 'react'
import { View, Text, Button, Modal } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

function GameModal({ navigation }) {
  // finishMessage: {visible: false, message: ''}
  const finishMessage = useSelector(state => state.finishMessage)
  const dispatch = useDispatch()
  function handleCloseModal() {
    dispatch({
      type: "SET_FINISH_MESSAGE",
      payload: {visible: false, message: ''}
    })
  }
  function handleReplay() {
    dispatch({
      type: "SET_REPLAYING",
      payload: true
    })
    handleCloseModal()
  }
  function handleChangeSetting() {
    navigation.navigate("Settings")
    handleReplay()
  }
  function handleFinishGame() {
    navigation.navigate("Finish")
    handleCloseModal()
  }
  const buttons = (
    <>
      <Button
        title="Close"
        onPress={ handleCloseModal }
      />
      <Button
        title="Replay New Board"
        onPress={ handleReplay }
      />
      <Button
        title="Change Settings"
        onPress={ handleChangeSetting }
      />
      <Button
        title="Finish Game"
        onPress={ handleFinishGame }
      />
    </>
  )
  const modalMessage = {
    'solved': 'Your answers are correct!',
    'unsolved': "Incorrect answers. Sorry.",
    'broken': 'Some invalid inputs on your board. :)'
  }
  return (
    <>
      <Modal
        animationType="fade"
        // transparent={true}
        visible={ finishMessage.visible }
      >
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Text style={{fontSize:26}}>
            { modalMessage[finishMessage.message] || finishMessage.message }
          </Text>
          { ['solved', 'unsolved', 'broken'].includes(finishMessage.message) ? (buttons) : (<></>)}
        </View>
      </Modal>
    </>
  )
}

export default GameModal;