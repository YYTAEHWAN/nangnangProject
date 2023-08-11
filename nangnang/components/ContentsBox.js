import React from 'react'
import { View, Text,StyleSheet } from 'react-native'

import Colors from '../constants/colors'

function ContentsBox({title, contents}){
    return (
        <View style={{alignItems:'center'}}>
            <View style={styles.InputText}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.contents}>{contents}</Text>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    InputText:{
        width:'70%',
        alignItems:'flex-start',

        flexDirection:'column',
        justifyContent:'space-between',
        
        padding:10,
    },
    title:{
        color:Colors.indigo500,
        fontWeight:'bold',
        marginLeft:5,
    },
    contents:{
        backgroundColor: '#fff',
        color: Colors.indigo500, 
        borderRadius: 10, 

        padding:10,
        width:'100%',
        height: 40,
        marginTop: 10,
    },

})

export default ContentsBox


ContentsBox.defaultProps={
    contents : "없음"
}