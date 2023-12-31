import { DarkTheme, NavigationContainer, Theme } from '@react-navigation/native';
import {
    createNativeStackNavigator,
    NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { DripsyProvider, makeTheme } from 'dripsy';
import Game from './Game';
import Home from './Home';
import 'expo-dev-client';
import Lobby from './Lobby';
import CreateLobby from './CreateLobby';
import InsideLobby from './InsideLobby';
import Toast from 'react-native-simple-toast';
import More from './More';
import Stats from './Stats';
import Profile from './Profile';
import Sound from './Sound';
import Personalization from './Presonalization';
import { useContext, useEffect } from 'react';
import Login from './Login';
import axios from "axios";
import { GameContext } from '../contexts';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

const screenOptions: NativeStackNavigationOptions = {
    headerTitleStyle: {
        // fontFamily: 'Verdana',
        fontWeight: '600',
    },
    headerStyle: {
        backgroundColor: '#262522',
    },
};

const theme = makeTheme({});

const Route = () => {
    const { auth, setAuth, setIdentifier, setAuthToken } = useContext(GameContext);

    const handleRefreshToken = async () => {
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        if (refreshToken === null) {
          // console.log("no refresh token here");
          Toast.show("No refresh token here", Toast.LONG);
          setAuth(false);
        } else {
          axios({
            method: "post",
            maxBodyLength: Infinity,
            url: "https://closm.com/api/auth/token/refresh",
            headers: {
              "Content-Type": "application/json",
            },
            data: JSON.stringify({
              refreshToken: refreshToken,
            }),
          })
            .then(async (res) => {
                Toast.show(JSON.stringify(res.data), Toast.LONG);
              if (res.data?.data) {
                setAuth(true);
              }
              if (res.data?.data?.refreshToken) {
                await AsyncStorage.setItem(
                  "refreshToken",
                  res.data?.data?.refreshToken
                );
                // console.log("refresh token updated");
              }
              if (res.data?.data?.accessToken) {
                await AsyncStorage.setItem(
                  "accessToken",
                  res.data?.data?.accessToken
                );
                setAuthToken(res.data?.data?.accessToken);
                // console.log("accessToken token updated");
              }
            })
            .catch((err) => {
              // console.log("error: ", err);
              Toast.show(JSON.stringify(err), Toast.LONG);
              setAuth(false);
            });
        }
      };

    const getProfileData = async () => {
        const accessToken = await AsyncStorage.getItem("accessToken");
        if(accessToken){
            axios({
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://closm.com/api/profile/user',
                headers: { 
                  'Authorization': 'Bearer '+accessToken
                }
            })
            .then((res) => {
                // console.log(res.data);
                Toast.show(JSON.stringify(res.data), Toast.LONG);
                if(res.data?.data?.identifier){
                    setIdentifier(res.data?.data?.identifier);
                }
            })
            .catch((err) => {
                Toast.show(JSON.stringify(err), Toast.LONG);
            })
        }
    }

      useEffect(() => {
        handleRefreshToken();
        getProfileData();
        Toast.show("Index screen", Toast.LONG);
      }, [])

    return (
        <DripsyProvider theme={theme}>
            <NavigationContainer>
                {auth ? (
                    <Stack.Navigator screenOptions={screenOptions}>
                        <Stack.Screen
                            name='Home'
                            component={Home}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='Game'
                            component={Game}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='Lobby'
                            component={Lobby}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='CreateLobby'
                            component={CreateLobby}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='InsideLobby'
                            component={InsideLobby}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='More'
                            component={More}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='Sound'
                            component={Sound}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='Profile'
                            component={Profile}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='Stats'
                            component={Stats}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='Personalization'
                            component={Personalization}
                            options={{ headerShown: false }}
                        />
                    </Stack.Navigator>
                ) : (
                    <Stack.Navigator screenOptions={screenOptions}>
                        <Stack.Screen
                            name='Login'
                            component={Login}
                            options={{ headerShown: false }}
                        />
                    </Stack.Navigator>
                )}
            </NavigationContainer>
        </DripsyProvider>
    );
};

export default Route;
