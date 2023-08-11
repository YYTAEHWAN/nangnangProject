import React, { useContext, useEffect, useState } from 'react';
import { View, Modal, StyleSheet, Text, TextInput,Image, KeyboardAvoidingView,Alert } from 'react-native';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';

import wallets from '../constants/wallets';
import EtherScanAPI from '../api/EtherScanAPI';
import Colors from '../constants/colors';
import FunctionButton from './Buttons/FunctionButton';
import SubmitButton from './Buttons/SubmitButton';
import { AuthContext } from '../context/AuthContext';
import { usePayinfo } from '../context/PayinfoContext';
const WalletInputModal = (props) => {

    // useImperativeHandle(ref, ()=>({
    //     takeaddress
    // }))

    const [state, dispatch] = useContext(AuthContext)
    const [payinfo, setPayinfo] = usePayinfo();   
    const [walletAddress, setWalletAddress] = useState("0x437782D686Bcf5e1D4bF1640E4c363Ab70024FBC");
    const [ticker, setTicker] = useState("");
    const [canPay, setCanPay] = useState(false);

    useEffect(()=>{
        console.log('from WalletInpuModal - 지갑선택시 결제정보',JSON.stringify(payinfo,null,2));
    },[payinfo])
    useEffect(()=>{
        console.log(`현재 ${ticker} 가치`,Value.currentTickerValue)
        console.log(`현재 지갑내 ${ticker} 가치`,Value.myTickerValue)
        console.log(`환산된 물건 가치`,Value.exchangedProduct_Value)
    },[Value])

    const [Value, setValue] = useState({
        currentTickerValue:0,
        exchangedProduct_Value : 0,
        myTickerValue:0,
    })

    const Balance = async ()=>{
        if(ticker === ""){
            Alert.alert("티커 선택","조회할 티커를 선택해주세요",[
                {
                    text:"닫기",
                    onPress:()=>null,
                    style:"cancel",
                }
            ] )
        }
        try{
            const currentTickerValue = await axios.get(`https://api.upbit.com/v1/ticker?markets=KRW-${ticker}`,{
                headers:{
                    Accept: 'application/json',
                },
            })
            setValue((e)=>({
                ...e,
                currentTickerValue: currentTickerValue.data[0].trade_price,
                exchangedProduct_Value : (payinfo.price / currentTickerValue.data[0].trade_price).toFixed(5),
            }))
        }catch(error){
            Error(error)
        }
        try{
            const myTickerValue = await axios({
                method:"POST",
                url:"http://172.16.1.83:8080/getBalance",
                data:{
                    "walletAddress": "0x437782D686Bcf5e1D4bF1640E4c363Ab70024FBC",
                    "tokenName": ticker,
                }
            })
            setValue((e)=>({
                ...e,
                myTickerValue : (myTickerValue.data.balance),
            }))
            if((Value.exchangedProduct_Value - Value.myTickerValue) >=0){
                setCanPay(true)
            }
        }catch(error){
            Error(error)
        }
    }
    //지갑주소가져오는 함수
    const takeAddress = async ()=> {
        try {
            const walletaddress =  await state.wallet.find(e => e.id === props.selecteditem.id)
            setWalletAddress(walletaddress.walletaddress)
        }catch(err){
            console.log("takeaddress error", err)
        }
    }


    const walletSelect = ()=>{
        if( walletAddress==="" || ticker ==="" ){
            Alert.alert("알림","지갑주소와 티커를 확인해주세요",[
                {
                  text:"확인",
                  onPress:()=>null,
                  style:"cancel",
                },
              ]);
        }else{
            if(canPay===false){
                Alert.alert("잔액 부족","지갑내 해당 코인 잔액이 부족합니다.",[
                    {
                      text:"확인",
                      onPress:()=>null,
                      style:"cancel",
                    },
                ]);
            }else{
                const newArrData = wallets.map((e, index)=>{
                    if(props.selecteditem.id == e.id){
                        return{
                            ...e,
                            selected: true,
                        }
                    }
                    return {
                        ...e,
                        selected:false
                    }
                })  
                setPayinfo(e => ({
                    ...e,
                    selectedWalletID: props.selecteditem.id,
                    selectedWallet: props.selecteditem.wallet,
                    exchangedvalue: Value.exchangedProduct_Value,
                    mywalletaddress: walletAddress,
                    ticker: ticker,
                }))
                dispatch({
                    type:'wallect_select',
                    id: props.selecteditem.id
                })
                props.setWalletList(newArrData)
                props.oncancel()  
            }
        }
    }
    return (
            <Modal
                animationType='fade'
                visible={props.visible}
                transparent={true}>
                    <KeyboardAvoidingView  behavior='padding' style={styles.centerdView}>
                    <View style={styles.modalView}>
                        <Text style={[styles.text, {fontSize: 20, color:Colors.orange500}]}>{props.selecteditem.wallet}</Text>
                        <View style={styles.iconwrapper}>
                            <Image
                                style={styles.image}
                                source={props.selecteditem.imageURL} />
                        </View>
                            <Text style={styles.text}>현 코인 가격 : {Value.currentTickerValue} 원</Text>
                        <Text style={styles.text}>환산된 가격 : <Text style={{color:'black',fontWeight: 'bold',}}>{Value.exchangedProduct_Value}</Text></Text>
                        <Text style={styles.text}>지갑 내 코인 가치: <Text style={{color:'black',fontWeight: 'bold',}}>{Value.myTickerValue}</Text></Text>
                        <TextInput
                            style={styles.inputaddress}
                            placeholder="지갑주소"
                            placeholderTextColor="#A9A9AC"
                            value={walletAddress}
                            onChangeText={(e) => setWalletAddress(e)} />
                        <View style={{borderWidth: 1,borderColor:'gray',borderRadius:10, flexDirection:'row', paddingHorizontal:10}}>
                            <View style={{justifyContent:'center'}}>
                                <Text style={styles.text}>티커 선택 </Text>
                            </View>
                            <Picker
                                selectedValue={ticker}
                                onValueChange={(value, index) => setTicker(value)}
                                mode="dropdown" // Android only
                                style={styles.picker}>
                                <Picker.Item label="..." value="" />
                                <Picker.Item label="ETH" value="ETH" />
                                <Picker.Item label="USDT" value="USDT" />
                                <Picker.Item label="USDC" value="USDC" />
                                <Picker.Item label="UNI" value="UNI" />
                                <Picker.Item label="WETH" value="WETH" />
                            </Picker>
                        </View>
                        <FunctionButton onPress={takeAddress}>지갑주소 가져오기</FunctionButton>
                        <FunctionButton onPress={Balance}>가격 조회</FunctionButton>
                        <FunctionButton onPress={props.oncancel}>닫기</FunctionButton>
                        <FunctionButton onPress={walletSelect}>이 지갑 선택</FunctionButton>
                    </View>
                    
                    </KeyboardAvoidingView>
            </Modal>

    );
};
const styles = StyleSheet.create({
    centerdView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
        height:'80%',
        width: '80%',

        margin: 20,
        backgroundColor: Colors.backgroundwhite,
        borderRadius: 20,
        padding: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    inputaddress: {
        backgroundColor: '#fff',
        color: Colors.indigo500,

        borderRadius: 10,
        width: "100%",
        height: 40,
        padding: 10,
    },
    text:{
        color: Colors.indigo500,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 30
    },
    iconwrapper: {
        // margin: '10%',
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        backgroundColor: Colors.backgroundwhite,

        justifyContent: 'center',
        alignItems: 'center',
    },
    picker: {
        // marginVertical: 30,
        width: 150,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
      },
})
export default WalletInputModal;