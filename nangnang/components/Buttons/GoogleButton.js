import React from 'react';
import { Pressable, Text, Image, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google'
import Colors from '../../constants/colors';

WebBrowser.maybeCompleteAuthSession();
// web : 185496097106-sp0mrog1pvfhkg0kijstue30hf0ugtf6.apps.googleusercontent.com
// IOS : 185496097106-9losums1qg0iljj25kgt1krhcsp4h5eg.apps.googleusercontent.com
// Android : 185496097106-35agk1e07b0h6t2egjm0sdh88odo1u5k.apps.googleusercontent.com
const Login = ({ navigation }) => {

    const [accessToken, setAccessToken] = useState();
    const [userInfo, setUserInfo] = useState();

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId:"185496097106-sp0mrog1pvfhkg0kijstue30hf0ugtf6.apps.googleusercontent.com",
        iosClientId: "185496097106-9losums1qg0iljj25kgt1krhcsp4h5eg.apps.googleusercontent.com",
        androidClientId: "185496097106-35agk1e07b0h6t2egjm0sdh88odo1u5k.apps.googleusercontent.com"
    });

    const [logininput, setLoginInput] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        if (response?.type === "success") { //response의 타입이 success 이면
            setAccessToken(response.authentication.accessToken);
            // accessToken && getUserData(); // accessToken이 있으면 fetchUserInfo를 실행시킨다.
        }
    }, [response])// response값이 바뀔때만 실행

    const getUserData = async () => {
        let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });  
        userInfoResponse.json().then(data=>{
            setUserInfo(data);
        });
    };

    const ShowUserData = () => {
        if (userInfo) {
            return (
                <View style={styles.userInfo}>
                    <Image source={{ uri: userInfo.picture }}  style={styles.profilePic}/>
                    <Text style={{ color: "red" }}>로그인 됬습니다. {userInfo.name}</Text>
                    <Text>{userInfo.email}</Text>
                    <View>
                        <Button title="결제 하기"/>
                    </View>
                </View>
            );
        }
    };
}

const GoogleButton = ({children}) => {
    return (
        <Pressable
            style={styles.button}
            title="회원가입">
            <Image
                style={{ width: 30, height: 30, marginRight: 10, }}
                source={require('../../assets/google.png')} />
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button:{
        borderRadius: 10,
        backgroundColor: Colors.indigo500,

        width: '100%',
        height: 50,
        marginTop: 10,

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        color: Colors.Incarnadine500
    }
})

export default GoogleButton;