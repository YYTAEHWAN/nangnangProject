import React from 'react'
import { View, Text,StyleSheet } from 'react-native'

import Colors from '../constants/colors'

function HeaderLogo() {
  return (
    <View>
        <Text style={styles.headerlogo}>NANG NANG</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    headerlogo:{
        color: Colors.orange500,
        fontSize:10,
        fontWeight:'bold',

        alignSelf:'flex-end', 
        padding: 30,
        marginVertical: 16,
      },
})
export default HeaderLogo