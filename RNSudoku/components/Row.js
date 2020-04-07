import React from 'react'
import { View } from 'react-native'
import ColInRow from './ColInRow'
import { styles } from '../styles'

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
    <View style={[ styles.rowLine, ( rowNum % 3 === 2 ? styles.rowBoldLine : styles.rowRegularLine )]}>
      { cols }
    </View>
  )
}

export default Row;