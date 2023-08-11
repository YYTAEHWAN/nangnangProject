import React, { useContext, useEffect, useState } from 'react';
import { View, Modal, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import EtherScanAPI from '../api/EtherScanAPI';

import Colors from '../constants/colors';
import FunctionButton from './Buttons/FunctionButton';

import { AuthContext } from '../context/AuthContext';
import wallets from '../constants/wallets';
const WalletAddress = (props) => {

    const [state, dispatch] = useContext(AuthContext)
    const [walletAddress, setWalletAddress] = useState("0x437782D686Bcf5e1D4bF1640E4c363Ab70024FBC");

    useEffect(()=>{
        console.log("WalletAddresModal",JSON.stringify(state,null,2))
    },[state])
    
    const WASaveHandler = async () =>{
        const wallet_id_num = wallets.find(e => e.id_num ===  props.selecteditem.id_num).id_num
        console.log(wallet_id_num);
        try{
            const res = await axios({
                method:"POST",
                url:"https://asia-northeast3-nangnang-b59c0.cloudfunctions.net/api/consumerschosenwallet",
                data:{  
                    consumer_id: state.uid,
                    crypto_wallet_idx : wallet_id_num,
                    wallet_address: walletAddress,
                }
            })
            console.log(JSON.stringify(res,null,2))
            saveAddress(props.selecteditem.id, walletAddress)
        }catch(e){
            console.log(e)
        }
    }

    const Initialization = ()=>{
        dispatch({
            type: 'initialization_address',
            id : props.selecteditem.id,
        })
        setWalletAddress("");
    }

    const saveAddress = (id, Address) => {
        dispatch({
            type:'save_address',
            id: id,
            walletaddress: Address,
        })
    }
    const addressVerification = async()=>{
        
    }
    return (
            <Modal
                animationType='fade'
                visible={props.visible}
                transparent={true}>
                    <View style={styles.centerdView}>
                    <View style={styles.modalView}>
                        <Text style={[styles.text, {fontSize: 20, color:Colors.orange500}]}>{props.selecteditem.wallet}</Text>
                        <Text style={styles.text}>{state.name}님</Text>
                        <TextInput
                            style={styles.inputaddress}
                            placeholder="지갑주소"
                            placeholderTextColor="#A9A9AC"
                            value={walletAddress}
                            onChangeText={(e) => setWalletAddress(e)} />
                        <FunctionButton onPress={addressVerification}>지갑주소 검증</FunctionButton>
                        <FunctionButton onPress={WASaveHandler}>지갑주소 등록</FunctionButton>
                        <FunctionButton onPress={Initialization}>지갑주소 지우기</FunctionButton>
                        <FunctionButton onPress={props.oncancel} >닫기</FunctionButton>
                    </View>
                    </View>
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
        height:'60%',
        margin: 20,
        backgroundColor: Colors.backgroundwhite,
        borderRadius: 20,
        padding: 35,
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
        width: 200,
        height: 40,
        // marginTop: 10,
        padding: 10,
    },
    text:{
        color: Colors.indigo500,
    },

})
export default WalletAddress;