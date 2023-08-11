import React from 'react';
import { Pressable,StyleSheet,Text } from 'react-native';
import Colors from '../../constants/colors';
const FunctionButton = ({children,onPress}) => {
    return (
        <Pressable
            style={styles.button}
            onPress={onPress}>
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    );
};
const styles = StyleSheet.create({
    button:{
        borderColor: Colors.indigo500,
        borderRadius: 20,
        borderWidth: 1,

        alignItems:'center',
        alignSelf: 'center',
        // margin: '10%',
        paddingVertical: 10,
        width: 120,
    },
    text:{
        
        color: Colors.indigo500
    }
})
export default FunctionButton;