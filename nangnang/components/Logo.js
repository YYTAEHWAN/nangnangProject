import React from 'react';
import { View, Image,Text,StyleSheet } from 'react-native';

import Colors from '../constants/colors';
const Logo = () => {
    return (
        <View style={styles.LogoView}>
            <Image
                style={[styles.logo, {width:100, height:100}]}                                    
                source={require('../assets/nangnang144.png')}/>
            <Text style={styles.logo}>NANG NANG</Text>
        </View>
    );
};

const styles= StyleSheet.create({
    LogoView:{
        // flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    logo:{
        color:Colors.orange500,
        fontSize:30,
    },

})
export default Logo;