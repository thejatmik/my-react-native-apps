import React from 'react'
import { View, Text, Button, Modal } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

function GameModal() {
  // finishMessage: {visible: false, message: ''}
  const finishMessage = useSelector(state => state.finishMessage)
  const dispatch = useDispatch()
  function handleCloseModal() {
    dispatch({
      type: "SET_FINISH_MESSAGE",
      payload: {visible: false, message: ''}
    })
  }
  return (
    <>
      <Modal
        animationType="fade"
        // transparent={true}
        visible={ finishMessage.visible }
      >
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Text>
            { finishMessage.message }
          </Text>
          <Button
            title="OKE"
            onPress={ handleCloseModal }
          />
        </View>
      </Modal>
    </>
  )
}

export default GameModal;