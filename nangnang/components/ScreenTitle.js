import React from 'react';
import { View,Text,StyleSheet } from 'react-native';

import Colors from '../constants/colors';
const ScreenTitle = (props) => {
    return (
        <View>
            <Text style={styles.title}>{props.title}</Text>
         <Text style={styles.content}>{props.content}</Text>
        </View>
    );
};

const styles =StyleSheet.create({
    title:{
        color: Colors.orange500,
        fontSize: 40,
        // fontWeight:'bold',
        // marginTop: '10%',
        textAlign: 'center',
    },
    content:{
        color:Colors.indigo500,
        
        textAlign:'center',
        marginTop: '5%',
    },
})

export default ScreenTitle;