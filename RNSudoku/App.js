import React, {useState, useEffect} from 'react'
import { Text, View, StatusBar, StyleSheet, Platform, Dimensions, TextInput, Button } from 'react-native'
import axios from 'axios'
import { createStore, applyMiddleware } from 'redux'
import { Provider, useSelector, useDispatch } from 'react-redux'
import thunk from 'redux-thunk'
import { reducers } from './store/reducers'
import { fetchGameBoard } from './store/actions'

const window = Dimensions.get('window')
const screen = Dimensions.get('screen')
const board = {
  width: screen.width - 20,
  height: screen.height - 20
}

function SudokuBoard({ emptyBoard }) {
  const rows = emptyBoard.map((item, index) => {
    return (
      <Row 
        key={ index }
        line={ item }
        rowNum={ index }
      ></Row>
    )
  })
  return (
    <View style={styles.boardContainer}>
      { rows }
    </View>
  )
}
function Row({ line, rowNum }) {
  const cols = line.map((item, index) => {
    return (
      <ColInRow
        key={ index }
        rowNum={ rowNum }
        colNum={ index }
      />
    )
  })
  return (
    <Provider store={ store }>
      <View style={[ styles.rowLine, ( rowNum % 3 === 2 ? styles.rowBoldLine : styles.rowRegularLine )]}>
        { cols }
      </View>
    </Provider>
  )
}
function ColInRow({ rowNum, colNum }) {
  const gameBoard = useSelector(state => state.gameBoard)
  const playerBoard = useSelector(state => state.playerBoard)
  function handleOnTextChange(row, col, val) {
    let newPlayerBoard = [...playerBoard];
    newPlayerBoard[row][col] = Number(val) + 0 || '0';
    // setPlayerBoard(newPlayerBoard)
    console.log(row, col, playerBoard[row][col], gameBoard[row][col])
  }
  return (
    <View style={ [styles.colInRowLine, ( colNum % 3 === 2 ? styles.colBoldLine : styles.colRegularLine )] }>
      {/* <Text>{ rowNum } { colNum } { boardValue }</Text> */}
      <TextInput
        value={ gameBoard[rowNum][colNum] === 0 ? playerBoard[rowNum][colNum].toString() : gameBoard[rowNum][colNum].toString() }
        style={ [ styles.inputCell, (gameBoard[rowNum][colNum] === 0 ? styles.bgWhite : styles.bgMagenta )] }
        maxLength={ 1 }
        selectTextOnFocus
        onChangeText={ text => { handleOnTextChange(rowNum, colNum, text) } }
        editable={ gameBoard[rowNum][colNum] === 0 }
      ></TextInput>
    </View>
  )
}

const store = createStore(reducers, applyMiddleware(thunk))
export default function Sudoku() {
  const dispatch = useDispatch()
  const [emptyBoard, setGameBoard] = useState([
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
  ])
  useEffect(() => {
    dispatch(fetchGameBoard())
  }, [])
  // gameBoard jadi kunci jawaban
  // playerBoard buat nampung input
  return (
    <Provider store={ store }>
      <View style={ styles.mainContainer }>
        <Text style={ styles.boardTitle }>Go Commit Sudoku</Text>
        <SudokuBoard emptyBoard={ emptyBoard } />
        <Button
          // onPress={}
          title="Press Me"
          color="#841584"
        />
      </View>
    </Provider>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight,
      },
      default: {
        paddingTop: 20,
      }
    })
  },
  boardContainer: {
    borderWidth: 3,
    ...Platform.select({
      default: {
        width: board.width,
        height: board.width,
      }
    })
  },
  boardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'monospace'
  },
  rowLine: {
    height: (board.width - 3) / 9,
    flexDirection: 'row',
  },
  rowRegularLine: {
    borderBottomWidth: 1
  },
  rowBoldLine: {
    borderBottomWidth: 3
  },
  colInRowLine: {
    width: (board.width - 3) / 9,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  colRegularLine: {
    borderRightWidth: 1
  },
  colBoldLine: {
    borderRightWidth: 3
  },
  inputCell: {
    textAlign: 'center',
    height: '100%',
    width: '100%'
  },
  bgGrey: {
    backgroundColor: '#ccc'
  },
  bgMagenta: {
    backgroundColor: '#f0f'
  },
  bgWhite: {
    backgroundColor: '#fff'
  }
})