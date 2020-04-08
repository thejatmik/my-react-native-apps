import { Platform, StatusBar, Dimensions, StyleSheet } from 'react-native'
const screen = Dimensions.get('screen')
const board = {
  width: screen.width - 20,
  height: screen.height - 20
}

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
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
  },
  bgBeige: {
    backgroundColor: '#f5f5dc'
  }
})