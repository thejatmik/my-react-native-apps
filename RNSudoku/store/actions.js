import axios from 'axios'
// import { State } from 'react-native-gesture-handler';

const encodeBoard = (board) => {
  return board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
}

const encodeParams = (params) => 
  Object.keys(params)
  .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
  .join('&');
  
export const SET_PLAYER_BOARD = (payload) => {
  return {
    type: "SET_PLAYER_BOARD",
    payload
  }
}

export const fetchGameBoard = (difficulty = 'easy', duration = 10) => {
  return (dispatch) => {
    dispatch({
      type: "SET_CHECK_MESSAGE",
      payload: ''
    })
    dispatch({
      type: "SET_BOARD_LOADING_STATE",
      payload: true
    })
    axios({
      url: `https://sugoku.herokuapp.com/board?difficulty=${difficulty}`,
      method: 'GET'
    })
      .then(({ data }) => {
        dispatch({
          type: "SET_GAME_BOARD",
          payload: data.board
        })
        const newPlayerBoard = data.board.map(item => {
          return [...item]
        })
        dispatch({
          type: "SET_PLAYER_BOARD",
          payload: newPlayerBoard
        })
      })
      .catch(({ response }) => {
        console.log(response)
      })
      .finally(_ => {
        dispatch({
          type: "SET_BOARD_LOADING_STATE",
          payload: false
        })
        dispatch({
          type: "SET_SCREEN_LOADING_STATE",
          payload: false
        })
        dispatch(startCountDown(duration))
      })
  }
}

export const checkSolved = (board) => {
  const data = {board: board}
  const submitted = encodeParams(data)
  return (dispatch) => {
    dispatch({
      type: "SET_CHECK_MESSAGE",
      payload: ''
    })
    dispatch({
      type: "SET_BOARD_LOADING_STATE",
      payload: true
    })
    axios({
      url: 'https://sugoku.herokuapp.com/validate',
      method: 'POST',
      data: submitted
    })
      .then(({data}) => {
        // console.log(data)
        dispatch({
          type: "SET_CHECK_MESSAGE",
          payload: data.status
        })
        if (data.status === 'solved') {
          dispatch({
            type: "STOP_TIMER"
          })
        }
      })
      .catch(console.log)
      .finally(_ => {
        dispatch({
          type: "SET_BOARD_LOADING_STATE",
          payload: false
        })
      })
  }
}

export const getSolved = (board) => {
  const data = {board: board}
  const submitted = encodeParams(data)
  return (dispatch) => {
    dispatch({
      type: "SET_CHECK_MESSAGE",
      payload: ''
    })
    dispatch({
      type: "SET_BOARD_LOADING_STATE",
      payload: true
    })
    axios({
      url: 'https://sugoku.herokuapp.com/solve',
      method: 'POST',
      data: submitted
    })
      .then(({ data }) => {
        // console.log(JSON.stringify(data.solution))
        // console.log(board)
        dispatch({
          type: "SET_PLAYER_BOARD",
          payload: data.solution
        })
      })
      .catch(console.log)
      .finally(_ => {
        dispatch({
          type: "SET_BOARD_LOADING_STATE",
          payload: false
        })
      })
  }
}

export const submitBoard = (board) => {
  const data = {board: board}
  const submitted = encodeParams(data)
  return (dispatch) => {
    dispatch({
      type: "SET_FINISH_MESSAGE",
      payload: {visible: true, message: 'checking your answer'}
    })
    axios({
      url: 'https://sugoku.herokuapp.com/validate',
      method: 'POST',
      data: submitted
    })
      .then(({data}) => {
        // console.log(data)
        dispatch({
          type: "SET_FINISH_MESSAGE",
          payload: {visible: true, message: data.status}
        })
        if (data.status === 'solved') {
          dispatch({
            type: "STOP_TIMER"
          })
        }
      })
      .catch(console.log)
      .finally(_ => {
      })
  }
}

export const startCountDown = (duration) => {
  return (dispatch) => {
    dispatch({
      type: "SET_COUNTER",
      payload: duration
    })
    dispatch({
      type: "SET_TIMER_START"
    })
    const clock = setInterval(() => {
      dispatch({
        type: "DECREASE_COUNTER"
      })
      // console.log(counter)
    }, 1000)
    dispatch({
      type: "SET_TIMER_ID",
      payload: clock
    })
  }
}
