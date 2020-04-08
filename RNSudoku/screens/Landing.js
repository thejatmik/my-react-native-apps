import React from 'react'
import { Text, View, Button, TextInput, Dimensions } from 'react-native'
import { styles } from '../styles'
import { useDispatch, useSelector } from 'react-redux'

const screen = Dimensions.get('screen');

function Landing({ navigation }) {
  const dispatch = useDispatch()
  const playerName = useSelector(state => state.playerName)
  function handleOnPress() {
    // console.log("yok")
    navigation.navigate('Game')
  }
  function handleChangeText(text) {
    dispatch({
      type: "SET_PLAYER_NAME",
      payload: text
    })
  }
  return (
    <>
      <View style={[ styles.bgBeige, styles.mainContainer ]}>
        <Text style={{ fontSize: 24 }}>Hello, { playerName || 'player'}!</Text>
        <TextInput
          style={{ borderWidth: 1, width: screen.width / 2, padding: 10, margin: 5, borderRadius: 10, borderColor: '#aaa' }}
          maxLength={16}
          onChangeText={ text => { handleChangeText(text) } }
          placeholder="player"
          autoFocus={true}
        ></TextInput>
        <Button
          title="To Sudoku"
          onPress={ handleOnPress }
        />
      </View>
    </>
  )
}

export default Landing;