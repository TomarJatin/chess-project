import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput } from 'dripsy';
import { Dimensions, StatusBar, Platform } from 'react-native';
import { Color, FontSize } from '../../GlobalStyle';
import GeneralButton from '../components/General/Button';
import { Image } from 'expo-image';
import Toast from "react-native-simple-toast";
import { useContext, useState } from 'react';
import axios from "axios";
import { GameContext } from '../contexts';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";


export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setAuth, setIdentifier, auth, setAuthToken} = useContext(GameContext);

    const handleLogin = async () => {
        if(email === "" || password === ""){
            return;
        }
        let _data = JSON.stringify({
          email: email.toLowerCase(),
          password: password,
        });
        console.log("data: ", _data);
    
        axios({
          method: "post",
          maxBodyLength: Infinity,
          url: "http://139.59.94.85:3010/api/auth/local/login",
          headers: {
            "Content-Type": "application/json",
          },
          data: _data,
        })
          .then(async (res) => {
            console.log("res: ", res.data);
            setAuth(true);
            if (res.data?.data?.refreshToken) {
              await AsyncStorage.setItem(
                "refreshToken",
                res.data?.data?.refreshToken
              );
            }
            if (res.data?.data?.accessToken) {
              await AsyncStorage.setItem(
                "accessToken",
                res.data?.data?.accessToken
              );
              setAuthToken(res.data?.data?.accessToken);
              console.log("decodding access token");
              const decoded =  jwtDecode(res.data?.data?.accessToken);
              console.log("jti: ", decoded.jti);
              if(decoded?.jti){
                await AsyncStorage.setItem(
                    "identifier",
                    decoded.jti
                  );
                  setIdentifier(decoded.jti);
              }
            }
            console.log("setting auth: ", auth);
            
          })
          .catch((err) => {
            if (err?.response?.data?.data?.error) {
              Toast.show(err?.response?.data?.data?.error, Toast.LONG, {
                textColor: "#ffffff",
              });
            }
          });
      };

    return (
        <SafeAreaView>
            <StatusBar backgroundColor={'#181818'} barStyle={'light-content'} />
            <View
                style={{
                    minHeight: Dimensions.get('window').height,
                    backgroundColor: Color.backgroundColor,
                    padding: 15,
                }}
            >
                {/* Enter details */}
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: 100,
                    }}
                >
                    <Image
                        style={{
                            width: 117,
                            height: 80,
                        }}
                        contentFit='contain'
                        source={require('../../assets/logo.svg')}
                    />
                    <Text
                        style={{
                            color: Color.textColor,
                            fontWeight: '800',
                            fontSize: FontSize.lg,
                            marginTop: 4,
                            textAlign: 'center',
                        }}
                    >
                        Chess Pro
                    </Text>
                </View>

                <View
                    style={{
                        marginTop: 20,
                        paddingVertical: 5,
                        paddingHorizontal: 20,
                        borderRadius: 100,
                        borderWidth: 2,
                        borderColor: '#60CBFA',
                    }}
                >
                    <Text
                        style={{
                            color: Color.textColor,
                            fontWeight: '800',
                            fontSize: FontSize.xxs,
                            marginBottom: 6,
                        }}
                    >
                        Email ID
                    </Text>
                    <TextInput
                        style={{ color: Color.textColor, fontWeight: '800', fontSize: FontSize.xs }}
                        placeholder='Please specify email id.'
                        placeholderTextColor={Color.textColor}
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                    />
                </View>

                <View
                    style={{
                        marginTop: 20,
                        paddingVertical: 5,
                        paddingHorizontal: 20,
                        borderRadius: 100,
                        borderWidth: 2,
                        borderColor: '#60CBFA',
                    }}
                >
                    <Text
                        style={{
                            color: Color.textColor,
                            fontWeight: '800',
                            fontSize: FontSize.xxs,
                            marginBottom: 6,
                        }}
                    >
                        Password
                    </Text>
                    <TextInput
                        style={{ color: Color.textColor, fontWeight: '800', fontSize: FontSize.xs }}
                        placeholder='Please enter password.'
                        placeholderTextColor={Color.textColor}
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                    />
                </View>

                <View style={{ width: '100%', marginTop: 100 }}>
                    <GeneralButton
                        onPress={handleLogin}
                        width={'100%'}
                        paddingVertical={10}
                        title='Continue as Guest'
                        borderRadius={14}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
