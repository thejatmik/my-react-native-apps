import React, {useState, useEffect} from 'react'
import { Text, View, StatusBar, StyleSheet, Platform, Dimensions, TextInput, Button } from 'react-native'
import axios from 'axios'

const window = Dimensions.get('window')
const screen = Dimensions.get('screen')
const board = {
  width: screen.width - 20,
  height: screen.height - 20
}

function SudokuBoard({ gameBoard, playerBoard, setPlayerBoard }) {
  const rows = gameBoard.map((item, index) => {
    return (
      <Row 
        key={ index }
        line={ item }
        rowNum={ index }
        gameBoard={ gameBoard }
        playerBoard={ playerBoard }
        setPlayerBoard={ setPlayerBoard }
      ></Row>
    )
  })
  return (
    <View style={styles.boardContainer}>
      { rows }
    </View>
  )
}
function Row({ line, rowNum, gameBoard, playerBoard, setPlayerBoard }) {
  const cols = line.map((item, index) => {
    return (
      <ColInRow
        key={ index }
        rowNum={ rowNum }
        colNum={ index }
        gameBoard={ gameBoard }
        playerBoard={ playerBoard }
        setPlayerBoard={ setPlayerBoard }
      />
    )
  })
  return (
    <View style={[ styles.rowLine, ( rowNum % 3 === 2 ? styles.rowBoldLine : styles.rowRegularLine )]}>
      { cols }
    </View>
  )
}
function ColInRow({ rowNum, colNum, gameBoard, playerBoard, setPlayerBoard }) {
  // console.log(playerBoard[rowNum][colNum] === gameBoard[rowNum][colNum])
  function handleOnTextChange(row, col, val) {
    // console.log(row, col, playerBoard[row][col], val)
    let newPlayerBoard = [...playerBoard];
    newPlayerBoard[row][col] = Number(val) + 0 || '0';
    setPlayerBoard(newPlayerBoard)
    console.log(row, col, playerBoard[row][col], gameBoard[row][col])
  }
  return (
    <View style={ [styles.colInRowLine, ( colNum % 3 === 2 ? styles.colBoldLine : styles.colRegularLine )] }>
      {/* <Text>{ rowNum } { colNum } { boardValue }</Text> */}
      <TextInput
        value={ gameBoard[rowNum][colNum] === 0 ? playerBoard[rowNum][colNum] : gameBoard[rowNum][colNum].toString() }
        style={ [ styles.inputCell, (gameBoard[rowNum][colNum] === 0 ? styles.bgWhite : styles.bgMagenta )] }
        maxLength={ 1 }
        selectTextOnFocus
        onChangeText={ text => { handleOnTextChange(rowNum, colNum, text) } }
        editable={ gameBoard[rowNum][colNum] === 0 }
      ></TextInput>
    </View>
  )
}

export default function Sudoku() {
  const [gameBoard, setGameBoard] = useState([
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
  const [playerBoard, setPlayerBoard] = useState([
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
    axios({
      url: `https://sugoku.herokuapp.com/board?difficulty=easy`,
      method: 'GET'
    })
      .then(({data}) => {
        setGameBoard(data.board)
        // setPlayerBoard([...data.board])
      })
      .catch(console.log)
  }, [])
  // gameBoard jadi kunci jawaban
  // playerBoard buat nampung input
  return (
    <View style={ styles.mainContainer }>
      <Text style={ styles.boardTitle }>Go Commit Sudoku</Text>
      <SudokuBoard setPlayerBoard={ setPlayerBoard } gameBoard={ gameBoard } playerBoard={ playerBoard } />
      <Button
        // onPress={}
        title="Press Me"
        color="#841584"
      />
    </View>
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