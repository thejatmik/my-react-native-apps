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
  screenLoading: false,
  boardLoading: false,
  difficulty: 'easy',
  playerName: '',
  checkMessage: '',
  solved: false,
  finishMessage: {visible: false, message: ''},
  timer: {toggle: false, duration: 300},
  replaying: false
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
    case "SET_SCREEN_LOADING_STATE": {
      return {
        ...state,
        screenLoading: payload
      }
    }
    case "SET_BOARD_LOADING_STATE": {
      return {
        ...state,
        boardLoading: payload
      }
    }
    case "SET_PLAYER_NAME": {
      return {
        ...state,
        playerName: payload
      }
    }
    case "SET_CHECK_MESSAGE": {
      return {
        ...state,
        checkMessage: payload
      }
    }
    case "SET_FINISH_MESSAGE": {
      return {
        ...state,
        finishMessage: payload
      }
    }
    case "SET_DIFFICULTY": {
      return {
        ...state,
        difficulty: payload
      }
    }
    case "SET_REPLAYING": {
      return {
        ...state,
        replaying: payload
      }
    }
    case "SET_TIMER": {
      return {
        ...state,
        time: payload
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}