if (typeof BigInt === 'undefined') global.BigInt = require('big-integer')

import React, { useState, useContext, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, Image, FlatList,TouchableOpacity,Alert} from 'react-native';
import { Link } from '@react-navigation/native';
import { WalletConnectModal, useWalletConnectModal } from '@walletconnect/modal-react-native';
import { utf8ToHex } from '@walletconnect/encoding';

import ScreenTitle from '../components/ScreenTitle';
import WalletInputModal from '../components/WalletInputModal';
import HeaderLogo from '../components/HeaderLogo';
import wallets from '../constants/wallets';
import Colors from '../constants/colors';
import SubmitButton from '../components/Buttons/SubmitButton';
import { usePayinfo } from '../context/PayinfoContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const formatData = (data, numColumns) =>{

    const numberOfFullRows = Math.floor(data.length/numColumns)

    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while(numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0){
        data.push({id: `blank-${numberOfElementsLastRow}`, empty: true})
        numberOfElementsLastRow = numberOfElementsLastRow + 1;
    }
    return data;
}

const projectId = 'e68a43fe8e9a0534d9f14f37689857ef';

const providerMetadata = {
  name: 'NangNang',
  description: 'NangNang',
  url: '',
  icons: "",
  redirect: {
    native: '',
    universal: ''
  }
};

const SelectWallet = ({navigation}) => {
    // WC_connector(WalletConnect_connector) 에서 사용할 함수들을 가져옴

    const { isOpen, open, close, provider, isConnected, address } = useWalletConnectModal();

    const personalSign = async () => {
        const message = 'Hello World';
        const hexMsg = utf8ToHex(message, true);
        const signature = await provider?.request(
        { method: 'personal_sign', params: [hexMsg, address] },
        'eip155:1' //optional
        );
        console.log(signature);
    };

    const [payinfo] = usePayinfo();  
    const [state, dispatch] =useContext(AuthContext);
    const [modalIsVisible, setModalIsVisible] = useState(false); 
    const [selectedItem, setSelectedItem] = useState({});
    const [walletlist, setWalletList] = useState([]);

    useEffect(()=>{
        setWalletList(wallets);
        return ()=>{
        }
    },[])
    const CW =()=>{
        console.log("CW 함수 실행")
        if(payinfo.selectedWalletID === ""){
            Alert.alert("지갑선택", "결제에 사용할 지갑을 먼저 선택해주세요",[
                {
                    text:"네",
                    onPress:()=>null,
                    style:"cancel"
                }
            ])
        }else{
            connectWallet()
        }
    }
    const CloseModalHandler = () => {
        setModalIsVisible(false);
    }

    const handleListItemPress = (item) => {
        setSelectedItem(item)
        setModalIsVisible(true)
    }   

    return (
        <View style={styles.MyWalletsView}>
            <View style={styles.header}>
                <Link to={{screen:'Main'}} style={styles.link}>메인으로가기</Link>
                <Text style={{color:'red'}}>사용자 : {state.name}</Text>
                <HeaderLogo />
            </View>
            <View style={styles.title}>
                <ScreenTitle title="지갑 선택" />
            </View>

            {/* 연결 */}
            <View>
                <SubmitButton onPress={async () => {
                    await open({ route: 'ConnectWallet' });
                    if(isOpen) {
                        console.log("yes open");
                    }
                    if(!isOpen) {
                        console.log("open not yet");
                    }

                    
                    console.log("open was completed?");
                }}>{isConnected ? 'View Account' : 'Connect'}</SubmitButton>
            </View>
            <WalletConnectModal projectId={projectId} providerMetadata={providerMetadata} />

                {/* sign 보내기 */}
            <View>
                <SubmitButton onPress={personalSign}>{isConnected ? '된건가?' : 'personalSign'}</SubmitButton>
            </View>
            <WalletConnectModal projectId={projectId} providerMetadata={providerMetadata} />
                {/* 닫기
            <View>
                <SubmitButton onPress={close}>{isConnected ? 'close' : 'isnt connected'}</SubmitButton>
            </View> */}

            <View style={{flex:1, width:'50%',alignSelf:'center'}}>
                    <SubmitButton onPress={() => navigation.navigate('Payinfo')}>결제 정보 확인</SubmitButton>
            </View>
            <View style={styles.WalletBlockView}>
                <FlatList
                    numColumns={2}
                    data={formatData(walletlist,2)}
                    renderItem={({item}) => {
                        if (item.empty === true){
                            return <View style={[styles.WalletBlock, styles.WalletBlockInvisible]}/>
                        }
                        return (
                            <View style={styles.WalletBlock}>
                                <View style={styles.iconwrapper}>
                                    <Image
                                        style={styles.image}
                                        source={item.imageURL} />
                                </View>
                                <Text style={styles.indigo500}>{item.wallet}</Text>
                                <TouchableOpacity 
                                    style={[styles.button,{backgroundColor: item.selected ? '#FF8691' : null}]}
                                    onPress={()=>handleListItemPress(item)}>
                                        <Text style={[styles.indigo500,{ fontSize: 15, alignSelf: 'center' }]}>{item.selected ? '선택됨'  : '결제하기'}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                    keyExtractor={item => item.id}
                    alwaysBounceVertical={false}
                />
            </View>
            <WalletInputModal
                    selecteditem={selectedItem}
                    visible={modalIsVisible}
                    oncancel={CloseModalHandler}
                    walletlist={walletlist}
                    setWalletList={setWalletList}/>
        </View>
    );
};

const styles = StyleSheet.create({
    MyWalletsView: {
        flex: 1,
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    title:{
        flex:1,
        // marginTop:,
    },
    WalletBlockView: {
        flex: 7,
        flexDirection: 'row',
        // justifyContent: 'space-around',
    },
    WalletBlockInvisible:{
        backgroundColor:"transparent"
    },
    WalletBlock: {
        flex:1,
        backgroundColor: '#fff',
        borderRadius: 10,

        width: '40%',
        alignItems: 'center',

        margin:10,
    },
    iconwrapper: {
        margin: '10%',
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        backgroundColor: Colors.backgroundwhite,

        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '70%',
        height: '70%',
        borderRadius: 30
    },
    button: {
        borderColor: Colors.indigo500,
        borderRadius: 20,
        borderWidth: 1,

        alignSelf: 'center',
        margin: '10%',
        marginBottom: '10%',
        paddingVertical: 5,
        paddingHorizontal: 10,
        // width: '100%',
    },
    text:{
        colors: Colors.indigo500,
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
})
export default SelectWallet;