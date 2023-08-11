import React, {useContext, useEffect, useState} from  'react';
import { View,Text,StyleSheet,ScrollView, FlatList } from 'react-native';
import { Link } from '@react-navigation/native';
import axios from 'axios';

import HeaderLogo from '../components/HeaderLogo';
import ScreenTitle from '../components/ScreenTitle';
import Colors from '../constants/colors';

import { usePayinfo } from '../context/PayinfoContext';
import { AuthContext } from '../context/AuthContext';
import {DataTable} from 'react-native-paper';

const MyPaymentlist = ({navigation}) => {
    
    const [payinfo, setPayinfo] = usePayinfo();
    
    const [state, dispatch] = useContext(AuthContext)
    const [paymentList, setPaymentList] = useState([]);

    // useEffect 데이터가져오기
    const dummydata =[{
            uid:"1",
            paymentid:"1",
            productname:"물김치",
            price:10000,
            productcount:1,
            paymenttime:"1시"
        },{
            uid:"2",
            paymentid:"2",
            productname:"배추김치",
            price:20000,
            productcount:2,
            paymenttime:"2시"
        },{
            uid:"3",
            paymentid:"3",
            productname:"열무김치",
            price:30000,
            productcount:3,
            paymenttime:"3시"
    }]
    // const loadPaymentlist = async ()=>{
    //     try{
    //         const res = await axios({
    //             methood:"GET",
    //             url:`https://asia-northeast3-nangnang-b59c0.cloudfunctions.net/api/getpaymentreceiptdata/getallpaymentreceiptdatabyuserid?user_id=${state.uid}`
    //         })
    //         console.log(JSON.stringify(res.data, null,2))
    //     }catch(e){
    //         console.log(e)
    //     }
        
    // }
    useEffect(()=>{
        async function loadPaymentlist(){
            try{
                const res = await axios({
                    methood:"GET",
                    url:`https://asia-northeast3-nangnang-b59c0.cloudfunctions.net/api/getpaymentreceiptdata/getallpaymentreceiptdatabyuserid?user_id=${state.uid}`
                })
                console.log(JSON.stringify(res.data.data, null,2))

                const paymentData = res.data.data.map((item)=>({
                    payment_receipt_idx: item.statusInfoData.payment_receipt_idx,
                    product_name: item.productsAllData[0].product_name,
                    total_won_price: item.participantsInfoData.total_won_price,
                    payment_end_time: item.statusInfoData.payment_end_time,
                }))
                console.log(JSON.stringify(paymentData,null,2))
                setPaymentList(paymentData)
            }catch(e){
                console.log(e)
            }
        }
        loadPaymentlist();
    },[])
    // 결제내역 가져오는 API Post
    // Item View
    const paymentdetail = async(id) =>{
        try{
            const paymentdetailData = await axios({
                method:"GET",
                url:`https://asia-northeast3-nangnang-b59c0.cloudfunctions.net/api/getpaymentreceiptdata/productnameprice?payment_receipt_idx=${id}`
            })
            console.log(JSON.stringify(paymentdetailData.data,null,2))
            if(paymentdetailData){
                navigation.navigate('Paymentdetail',{ data : paymentdetailData.data.data})
            }else{
                console.log("제품 상세 데이터를 가져올수없습니다.")
            }
        }catch(e){
            console.log(e)
        }
    }
    const renderItem = ({item, key})=>{
        return(
            <DataTable.Row style={styles.tablerow}>
                <DataTable.Cell>{item.payment_receipt_idx}</DataTable.Cell>
                <DataTable.Cell>{item.product_name}</DataTable.Cell>
                <DataTable.Cell>{item.total_won_price}</DataTable.Cell>
                <DataTable.Cell>{item.payment_end_time}</DataTable.Cell>
                <DataTable.Cell onPress={()=>{paymentdetail(item.payment_receipt_idx)}}>
                    <Text style={{color:Colors.orange500, alignSelf:'center'}} > 상세보기</Text></DataTable.Cell>
            </DataTable.Row>
        )
    }
    return (
        <View style={styles.PaymentlistView}>
            <View style={styles.header}>
                <Link to={{screen:'Main'}}  style={styles.link}>뒤로 가기</Link>
                <Text style={{color:'red'}}>사용자 : {state.name}</Text>
                <HeaderLogo />
            </View>
            <View style={styles.title}>
                <ScreenTitle title="결제 내역"/>
            </View>
                <DataTable style={styles.table}>
                    <DataTable.Header style={styles.tableheader}>
                        <DataTable.Title>결제번호</DataTable.Title>
                        <DataTable.Title>상품</DataTable.Title>
                        <DataTable.Title>가격</DataTable.Title>
                        <DataTable.Title>결제시간</DataTable.Title>
                        <DataTable.Title></DataTable.Title>
                    </DataTable.Header>
                        <FlatList
                        data={paymentList}
                        renderItem={renderItem}
                        keyExtractor={item=>item.id}
                        ></FlatList>
                </DataTable>
        </View>
    );
};
const styles = StyleSheet.create({
    PaymentlistView: {
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
        flex:0.2
    },
    button:{
        flex:0.3,
        width:'70%',
        alignSelf:'center',
        // alignItems:'center'
    },
    text:{
        colors: Colors.indigo500,
    },
    table:{
        width:'90%', 
        alignSelf:'center', 
        borderWidth: 1,
        borderColor:'black',
        borderRadius:15,
    },
    tableheader:{
        borderBottomWidth:1,
        borderBottomColor:'black',
        borderTopStartRadius:13,
        borderTopRightRadius:13,
        theme:'dark',
        backgroundColor:'#8B98CC',
    },
    tablerow:{
        borderTopWidthWidth:1,
        borderBottomColor:'black',
    }

})
export default MyPaymentlist;
