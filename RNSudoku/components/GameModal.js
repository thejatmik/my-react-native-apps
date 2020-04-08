import React from 'react'
import { View, Text, Button, Modal } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { styles } from '../styles'

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
      <View style={{ marginBottom: 5 }}>
        <Button
          title="Continue To Board"
          onPress={ handleCloseModal }
        />
      </View>
      <View style={{ marginBottom: 5 }}>
        <View style={{ marginVertical: 5 }}>
          <Button
            title="Replay New Board"
            onPress={ handleReplay }
            color="#2b2"
          />
        </View>
        <View style={{ marginVertical: 5 }}>
          <Button
            title="Change Settings"
            onPress={ handleChangeSetting }
            color="#555"
          />
        </View>
        <View style={{ marginVertical: 5 }}>
          <Button
            title="Finish Game"
            onPress={ handleFinishGame }
            color="#d22"
          />
        </View>
      </View>
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
        <View style={ styles.mainContainer }>
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