import React, { useState, useEffect,useContext } from 'react';
import { Image, Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import { Link } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Colors from '../constants/colors';
import HeaderLogo from '../components/HeaderLogo';
import InputText from '../components/InputText';
import ScreenTitle from '../components/ScreenTitle';
import SubmitButton from '../components/Buttons/SubmitButton';
import GoogleButton from '../components/Buttons/GoogleButton';

import { AuthContext } from '../context/AuthContext';

const Login = ({ navigation }) => {
    const [loginInput, setLoginInput] = useState({
        id:"test",
        password:"test123",
    });
    const [state, dispatch] =useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const LoginInputHandler = (key, value) => {
        setLoginInput(prevState => ({
            ...prevState,
            [key]: value,
        }));
    }

    const LoginHandler =async()=>{
        setIsLoading(true);
        try{
            const res = await axios({
                method:"POST",
                url:"https://asia-northeast3-nangnang-b59c0.cloudfunctions.net/api/login/loginreturndata",
                headers:{
                    "Content-Type" :"application/json"
                },
                data:{
                    "input_user_id":loginInput.id,
                    "input_user_pwd":loginInput.password,
                }
            })
            const walletaddress = await axios({
                method:"GET",
                url:`https://asia-northeast3-nangnang-b59c0.cloudfunctions.net/api/consumerschosenwallet?consumer_id=${loginInput.id}`,
            })
            // console.log(JSON.stringify(walletaddress.data, null, 2))
            const wallet = state.wallet
            wallet.forEach((item)=>{
                const {wallet_num} = item;
                if(walletaddress.data.data[wallet_num]){
                    item.walletaddress = walletaddress.data.data[wallet_num];
                }
            })
            dispatch({
                type:'user_login',
                payload: true,
                uid : loginInput.id,
                name: res.data.result.name,
                wallet : wallet
            })
        }catch(e){
            console.log(e)
        }
        setLoginInput(false)
    }
    // const LoginHandler = async () => {
    //     axios({
    //         method:"POST",
    //         url:"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword",
    //         params:{
    //             key:'AIzaSyDYSJighl4OVsw3HPsTul-DRREMKyu0EOI',
    //         },
    //         data:{
    //             email:loginInput.email,
    //             password:loginInput.password,
    //         }
    //     }).then((res)=>{
    //         dispatch({
    //             type:'user_login',
    //             payload: true,
    //             uid: res.data.localId,
    //             email: res.data.email
    //         })
    //     }).catch((e)=>{
    //         console.log(e.message);
    //     }).finally(()=>{
    //         navigation.navigate('Main')
    //     })
    // }

    return (
        <View style={styles.LoginView}>
            <HeaderLogo />
            <View style={styles.title}>
                <ScreenTitle title="낭낭" content="암호화폐 지갑 통합 결제 플랫폼" />
            </View>
            <View style={styles.inputtext}>
                <InputText
                    name="이메일"
                    placeholder="이메일"
                    value={loginInput.id}
                    onChangeText={text => {
                        LoginInputHandler('id', text)
                    }} />
                <InputText 
                    name="비밀번호" 
                    placeholder="비밀번호" 
                    secureTextEntry={true}
                    value={loginInput.password}
                    onChangeText={text => {
                        LoginInputHandler('password', text)
                    }} />
                <View style={styles.Findpassword}>
                    <Text>비밀번호를 잊어버리셨나요?</Text>
                </View>
            </View>
            <View style={styles.ButtonView}>
                <SubmitButton onPress={LoginHandler}>{isLoading ?  <ActivityIndicator/> : "로그인"}</SubmitButton>
                <GoogleButton>구글로 로그인</GoogleButton>
                <View style={styles.GotoRegister}>
                    <Text>계정이 없으신가요?</Text>
                    <Link to={{screen:'Register'}} style={styles.link}>회원가입</Link>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    LoginView: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
    title:{
        flex:1,
    },  
    inputtext:{
        flex:1,
    },
    Findpassword: {
        marginHorizontal: 20,
        marginTop: '5%',
        // marginBottom:'10%',
        width: '70%',

        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'flex-end'
    },
    ButtonView: {
        flex:2,
        // paddinng:10,
        // marginTop: 10,
        width: '70%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    GotoRegister: {
        marginTop: 20,
        width: '70%',

        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignSelf: 'flex-end',
    },
    link:{
        color: Colors.orange500,
    },
});
export default Login;