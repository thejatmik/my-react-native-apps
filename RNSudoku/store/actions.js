import axios from 'axios'

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
      })
      // .catch(console.log)
  }
}