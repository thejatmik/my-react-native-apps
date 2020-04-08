import React from 'react'
import { Text, View } from 'react-native'
import { styles } from '../styles'

function Loading() {
  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontSize:26}}>Loading bang...</Text>
      </View>
    </>
  )
}

export default Loading;