import React from 'react'
import { useSelector } from 'react-redux'
import { View, Text, Button } from 'react-native'
import { styles } from '../styles'

function Finish({ navigation }) {
  const playerName = useSelector(state => state.playerName)
  function handleToLanding() {
    navigation.navigate("Landing")
  }
  return (
    <>
      <View style={ styles.mainContainer }>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Thanks for playing, { playerName || 'player' }!</Text>
        <Text>&nbsp;</Text>
        <Button
          title="To Landing"
          onPress={ handleToLanding }
        />
      </View>
    </>
  )
}

export default Finish;