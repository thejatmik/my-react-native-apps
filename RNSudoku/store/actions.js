import axios from 'axios'

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

export const fetchGameBoard = (difficulty = 'easy') => {
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
      .catch(console.log)
      .finally(_ => {
        dispatch({
          type: "SET_BOARD_LOADING_STATE",
          payload: false
        })
        dispatch({
          type: "SET_SCREEN_LOADING_STATE",
          payload: false
        })
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
      })
      .catch(console.log)
      .finally(_ => {
      })
  }
}