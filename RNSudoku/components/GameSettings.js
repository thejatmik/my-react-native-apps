import React, { useState, useEffect } from 'react'
import { Text, View, Button, Switch } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import RadioForm from 'react-native-simple-radio-button';
import { styles } from '../styles'

function GameSettings({ navigation }) {
  const dispatch = useDispatch()
  const difficulty = useSelector(state => state.difficulty)
  const timer = useSelector(state => state.timer)

  const [radioProps, setRadioProps] = useState([
    {label: 'Easy', value: difficulty === 'easy' ? 1 : 0, difficulty: 'easy'},
    {label: 'Medium', value: difficulty === 'medium' ? 1 : 0, difficulty: 'medium'},
    {label: 'Hard', value: difficulty === 'hard' ? 1 : 0, difficulty: 'hard'}
  ])

  const [promptChange, setPromptChange] = useState('')
  const [toggleTimer, setToggleTimer] = useState(false)
  useEffect(() => {
    setToggleTimer(timer.toggle)
  }, [timer])

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
    if ( toggleTimer !== timer.toggle ) {
      dispatch({
        type: "TOGGLE_TIMER"
      })
      dispatch({
        type: "SET_REPLAYING",
        payload: true
      })
    }
    navigation.navigate("Board")
    setPromptChange("")
  }
  function handleCancelButton() {
    navigation.navigate("Board")
  }
  function handleSwitchToggle() {
    setToggleTimer(!toggleTimer)
    setPromptChange("Tap Save button to change game to selected difficulty")
  }
  return (
    <>
      <View style={ styles.mainContainer }>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Select Difficulty</Text>
          <RadioForm
            radio_props={ radioProps }
            onPress={(value, propsIndex) => { handleRadioProps(propsIndex) }}
          />
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Time Attack</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Solve Any Board in 300 seconds</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={ toggleTimer ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={ handleSwitchToggle }
            value={ toggleTimer }
          />
        </View>
        <Text> { promptChange }</Text>
        <View style={{ flexDirection: 'row', paddingTop: 5 }}>
          <Button
            title="Save"
            onPress={ handleSaveButton }
            color="#1a1"
          />
          <Text>&nbsp;</Text>
          <Button
            title="Cancel"
            onPress={ handleCancelButton }
            color="#ba7"
          />
        </View>
      </View>
    </>
  )
}

export default GameSettings;