import axios from 'axios'

export const SET_PLAYER_BOARD = (payload) => {
  return {
    type: "SET_PLAYER_BOARD",
    payload
  }
}

export const fetchGameBoard = () => {
  return (dispatch) => {
    axios({
      url: `https://sugoku.herokuapp.com/board?difficulty=easy`,
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
  }
}