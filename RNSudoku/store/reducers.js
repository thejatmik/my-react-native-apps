const initialState = {
  gameBoard: [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
  ],
  playerBoard: [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
  ],
  loading: false
}

export const reducers = (state = initialState, action) => {
  const { type, payload } = action;
  switch(type) {
    case "SET_GAME_BOARD": {
      return {
        ...state,
        gameBoard: [
          ...payload
        ]
      }
    }
    case "SET_PLAYER_BOARD": {
      return {
        ...state,
        playerBoard: [
          ...payload
        ]
      }
    }
    case "SET_LOADING_STATE": {
      return {
        ...state,
        loading: payload
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}