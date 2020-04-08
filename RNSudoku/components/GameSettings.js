import React, { useState, useEffect } from 'react'
import { Text, View, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import RadioForm from 'react-native-simple-radio-button';

function GameSettings({ navigation }) {
  const dispatch = useDispatch()
  const difficulty = useSelector(state => state.difficulty)
  const [radioProps, setRadioProps] = useState([
    {label: 'Easy', value: difficulty === 'easy' ? 1 : 0, difficulty: 'easy'},
    {label: 'Medium', value: difficulty === 'medium' ? 1 : 0, difficulty: 'medium'},
    {label: 'Hard', value: difficulty === 'hard' ? 1 : 0, difficulty: 'hard'}
  ])
  const [promptChange, setPromptChange] = useState('')
  function handleRadioProps(propsIndex) {
    const newRadioProps = radioProps.map(item => {
      return {...item}
    })
    newRadioProps.forEach((item, index) => {
      if( index === propsIndex) {
        item.value = 1
      } else {
        item.value = 0
      }
    })
    setRadioProps(newRadioProps)
    setPromptChange("Tap Save button to change game to selected difficulty")
  }
  function handleSaveButton() {
    const selected = radioProps.filter(item => {
      return item.value === 1
    })[0]
    if (selected.difficulty !== difficulty) {
      // console.log(selected.difficulty)
      dispatch({
        type: "SET_DIFFICULTY",
        payload: selected.difficulty
      })
    }
    navigation.navigate("Board")
    setPromptChange("")
  }
  function handleCancelButton() {
    navigation.navigate("Board")
    setPromptChange("")
  }
  return (
    <>
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text>Select Difficulty</Text>
        <Text> { promptChange }</Text>
        <RadioForm
          radio_props={ radioProps }
          onPress={(value, propsIndex) => { handleRadioProps(propsIndex) }}
        />
        {/* <Text>Toggle Timer</Text> */}
        <Button
          title="Save"
          onPress={ handleSaveButton }
        />
        <Button
          title="Cancel"
          onPress={ handleCancelButton }
        />
      </View>
    </>
  )
}

export default GameSettings;