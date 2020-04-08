import React from 'react'
import { Text, View } from 'react-native'
import { styles } from '../styles'

function Loading() {
  return (
    <>
      <View style={ styles.mainContainer }>
        <Text style={{fontSize:26}}>Loading bang...</Text>
      </View>
    </>
  )
}

export default Loading;