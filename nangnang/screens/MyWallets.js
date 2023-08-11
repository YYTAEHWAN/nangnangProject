import React, { useContext, useState,useEffect } from 'react';
import { Text, View, StyleSheet, Image, FlatList,TouchableOpacity,Modal} from 'react-native';
import { Link } from '@react-navigation/native';


import ScreenTitle from '../components/ScreenTitle';
import HeaderLogo from '../components/HeaderLogo';
import wallets from '../constants/wallets';
import Colors from '../constants/colors';
import SubmitButton from '../components/Buttons/SubmitButton';
import { AuthContext } from '../context/AuthContext';
import WalletAddress from '../components/WalletAddress';

const formatData = (data, numColumns) =>{

    const numberOfFullRows = Math.floor(data.length/numColumns)

    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while(numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0){
        data.push({id: `blank-${numberOfElementsLastRow}`, empty: true})
        numberOfElementsLastRow = numberOfElementsLastRow + 1;
    }
    return data;
}

const MyWallets = ({navigation}) => {
    
    const [state, dispatch] = useContext(AuthContext)
    const [modalIsVisible, setModalIsVisible] = useState(false); 
    const [selectedItem, setSelectedItem] = useState({});

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
                <ScreenTitle title="내 지갑"/>
            </View>
            <View style={{flex:1, width:'50%',alignSelf:'center'}}>
                    <SubmitButton>내 정보</SubmitButton>
            </View>
            <View style={styles.WalletBlockView}>
                <FlatList
                    numColumns={2}
                    data={formatData(wallets,2)}
                    renderItem={({ item}) => {
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
                                    style={styles.button}
                                    onPress={()=>handleListItemPress(item)}>
                                    <Text style={[styles.indigo500,{ fontSize: 10, alignSelf: 'center' }]}>지갑 주소 등록</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                    keyExtractor={item => item.id}
                    alwaysBounceVertical={false}
                />
                <WalletAddress
                    selecteditem={selectedItem}
                    visible={modalIsVisible} 
                    oncancel={CloseModalHandler}/>
            </View>
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
export default MyWallets;