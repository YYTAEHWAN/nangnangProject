import React from 'react';
import {  Text,  StyleSheet, Pressable, ActivityIndicator,  } from 'react-native';

import Colors from '../../constants/colors';

const SubmitButton = ({children, onPress, loading}) => {
    return (
    <Pressable
        style={styles.button}
        onPress={onPress}>
        {loading && <ActivityIndicator size="small" color={Colors.Incarnadine500}/>}
        <Text style={styles.text}>{children}</Text>
    </Pressable>
    );
};

const styles = StyleSheet.create({
    button:{
        borderRadius: 10,
        backgroundColor: Colors.indigo500,

        width: '100%',
        height: 50,
        marginTop: 10,

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        color: Colors.Incarnadine500,
        alignSelf:'center',
    }
})

export default SubmitButton;