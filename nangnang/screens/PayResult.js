import React, {useContext} from  'react';
import { View,Text,StyleSheet,ScrollView } from 'react-native';
import { Link } from '@react-navigation/native';

import HeaderLogo from '../components/HeaderLogo';
import ScreenTitle from '../components/ScreenTitle';
import Colors from '../constants/colors';
import SubmitButton from '../components/Buttons/SubmitButton';
import ContentsBox from '../components/ContentsBox';
import { usePayinfo } from '../context/PayinfoContext';
import { AuthContext } from '../context/AuthContext';

const PayResult = ({navigation}) => {

    const [payinfo, setPayinfo] = usePayinfo();
    
    const [state, dispatch] = useContext(AuthContext)
    const PaymentComplete = ()=>{
        setPayinfo(it => ({
            ...it,
            inpayment:false
        }))
        console.log("여기있던 killSession 함수 지워서 아무것도 없음");
        navigation.navigate('Main')
        console.log("PaymentComplete", JSON.stringify(payinfo,null,2))
        
    }
    return (
        <View style={styles.PayinfoView}>
            <View style={styles.header}>
                <Link to={{screen:'MyWallets'}}  style={styles.link}>뒤로 가기</Link>
                <Text style={{color:'red'}}>사용자 : {state.name}</Text>
                <HeaderLogo />
            </View>
            <View style={styles.title}>
                <ScreenTitle title="결제 완료" />
            </View>
            <ScrollView style={styles.content}>
                <ContentsBox title="제품명" contents={payinfo.product}/>
                <ContentsBox title="결제된 금액(원)" contents={payinfo.price}/>
                <ContentsBox title="사용한 지갑" contents={payinfo.wallet}/>
                <ContentsBox title="사용한 코인" contents={payinfo.ticker}/>
                <ContentsBox title="환산된 코인 금액" contents={payinfo.exchangedvalue}/>
                <ContentsBox title="보낸 지갑 주소" contents={payinfo.walletaddress}/>
            </ScrollView>
            <View style={styles.button}>
                <SubmitButton onPress={PaymentComplete}>확인</SubmitButton>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    PayinfoView: {
        flex: 1,
    },
    header:{
        // flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    link:{
        color: Colors.orange500,
        fontSize:15,
        fontWeight:'bold',
        // borderWidth:1,

        alignSelf:'flex-end', 
        padding: 30,
        marginVertical: 16,
    },
    title:{
        flex:0.3
    },
    content:{
        flex:1,
    },
    button:{
        flex:0.3,
        width:'70%',
        alignSelf:'center',
        // alignItems:'center'
    }
})
export default PayResult;
