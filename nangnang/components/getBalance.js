import React, { useState } from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import axios from 'axios';

const getBalance = () => {
    const [text, setText] = useState('Click the button to get balance!');
    const handleButtonClick = async () => {
        const walletAddress = "0x437782D686Bcf5e1D4bF1640E4c363Ab70024FBC"; // replace with your wallet address
        const apiKey = "insert your api key"; // replace with your Etherscan API key
        const data = await getWalletBalance(walletAddress, apiKey);
        setText(`Your wallet balance is ${data} ETH`);
      }
      const getWalletBalance = async (walletAddress, apiKey) => {
          const response = await axios.get(`https://api.etherscan.io/api?module=account&action=balance&address=${walletAddress}&tag=latest&apikey=${apiKey}`).catch(error => {
            if (error.response) {
              // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
              console.log(error.response.data)
              console.log(error.response.status)
              console.log(error.response.headers)
            } else if (error.request) {
              // 요청이 이루어 졌으나 응답을 받지 못했습니다.
              // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
              // Node.js의 http.ClientRequest 인스턴스입니다.
              console.log(error.request)
            } else {
              // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
              console.log('Error', error.message)
            }
            console.log(error.config)
          });
          console.log(response.data);
          const balanceInWei = response.data.result;
          balanceInEth = balanceInWei / 10 ** 18;
          return balanceInEth;
      }
  return (
    <View style={styles.container}>
        <Text>{text}</Text>
        <Button onPress={handleButtonClick} title="click"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1 ,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
  },
});

export default getBalance;