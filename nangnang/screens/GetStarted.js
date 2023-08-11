import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import Logo from '../components/Logo';
import Colors from '../constants/colors';
const GetStarted = ({navigation}) => {
    return (
        <View style={styles.GetStartedView}>
            <Logo/>
            <TouchableOpacity
                style={[styles.StartButton, { marginTop: '50%', width: '50%' }]}
                onPress={() => navigation.navigate('Login')}>
                <Image
                    source={require('../assets/arrow.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.StartButton, {marginTop: '10%', width: '50%' }]}
                onPress={() => navigation.navigate('Main')}>
                <Text style={styles.text}>홈 화면으로 이동</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    GetStartedView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        // marginTop: '50%',
    },
    StartButton:{
        width: '100%',
        height: 50,
        borderRadius: 10,
        backgroundColor: Colors.indigo500,
        justifyContent:'center',
        alignItems:'center',
    },
    text:{
        color: Colors.Incarnadine500,
    }
})

export default GetStarted;