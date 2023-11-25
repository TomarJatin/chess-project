import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Dimensions,
    Pressable,
    Text,
    View,
    useWindowDimensions,
    StatusBar,
    ImageBackground,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { Image } from 'expo-image';
import EmptyBoard from '../components/EmptyBoard';
import { Color, FontSize } from '../../GlobalStyle';
import GeneralButton from '../components/General/Button';
import { useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { GameContext } from '../contexts';
import Toast from 'react-native-simple-toast';
import useWebSocket, {ReadyState} from 'react-native-use-websocket';
import BottomNav from '../components/General/BottomNav';
import axios from 'axios';

const Home = ({ navigation }) => {
    const { width } = useWindowDimensions();
    const { setSelectedMode, setTimer,  setColor, setMatchId, identifier, authToken, timer, setPrevInstance, setJoinRoom } = useContext(GameContext);
   
    

    // let ws = useRef(new WebSocket('ws://139.59.94.85:3000/ws/'+authToken)).current;


    // useEffect(() => {
    //     // ws.onopen = () => {
    //     //     console.log('connection successful');
    //     // };
    //     // ws.onclose = (e) => {
    //     //     console.log('closed connection');
    //     // };
    //     // ws.onerror = (e) => {
    //     //     console.log('error is', e);
    //     // };
    //     if(lastMessage){

    //     }
    // }, []);

    const handleClick = () => {
        console.log('button clicked');
    };

    const handleLobbyClick = () => {
        console.log('Lobby clicked');
        navigation.navigate('Lobby');
    };

    const handleCreateRoom = () => {
        navigation.navigate('CreateLobby');
    };

    // const joinRoom = (timer: number) => {
    //     axios({
    //         method: 'post',
    //         maxBodyLength: Infinity,
    //         url: `http://139.59.94.85:3010/api/lobby/findMatch?identifier=${identifier}&matchType=${timer}min`,
    //     }).then((res) => {
    //         Toast.show(JSON.stringify(res.data), Toast.LONG);
    //         console.log(JSON.stringify(res.data));
    //         if(res.data?.data?.color && res.data?.data?.matchId){
    //             let _color = res.data.data.color === "white" ? "w" : "b";
    //             setColor(_color);
    //             setMatchId(res.data.data.matchId);
    //             setPrevInstance(null);
    //             navigation.navigate("Game");
    //         }
    //     })
    //     .catch((err) => {
    //         Toast.show(JSON.stringify(err), Toast.LONG);
    //         console.log(JSON.stringify(err));
    //     })
    // }

    const checkCurrentMatchResponse = (data, timer) => {
         if(data?.data){
            if(data?.data?.matchId){
                setMatchId(data?.data?.matchId);
            }
            if(data?.data?.whitePiece){
                const _color = data.data.whitePiece === identifier ? 'w': 'b';
                setColor(_color);
            }
            navigation.navigate("Game");
        }
    }

    const getCurrentMatch = (timer: number) => {
        console.log("identifier: ", identifier);
        axios({
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://139.59.94.85:3010/api/lobby/currentMatch?identifier=${identifier}`,
        }).then((res) => {
            Toast.show(JSON.stringify(res.data), Toast.LONG);
            console.log(JSON.stringify(res.data));
            checkCurrentMatchResponse(res.data, timer);
        })
        .catch((err) => {
            console.log("current match error: ", err?.response?.data)
            if(err?.response?.data?.data?.error && err?.response?.data?.data?.error === "no match found"){
                console.log("get current match error: ", err?.response?.data?.data?.error);
                setTimer(timer);
                setJoinRoom(true);
                navigation.navigate("Game");
            }
        })
    }

    const handlePlayOnineClick = (mode: string, timer: number) => {
        setSelectedMode(mode);
        setTimer(timer);
        getCurrentMatch(timer);
    };

    const handleJoinRoom = () => {
        navigation.navigate('Lobby');
    };

    return (
        <SafeAreaView
            style={{
                width: '100%',
                flex: 1,
            }}
        >
            <StatusBar backgroundColor={'#181818'} barStyle={'light-content'} />
            <FlatList
                data={['1']}
                renderItem={() => (
                    <View
                        style={{
                            minHeight: Dimensions.get('window').height,
                            backgroundColor: Color.backgroundColor,
                            paddingHorizontal: 15,
                            paddingTop: 20,
                            paddingBottom: 50,
                        }}
                    >
                        {/* Coins and Watch Ads */}

                        <View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 5,
                                }}
                            >
                                <Image
                                    style={{
                                        width: 50,
                                        height: 50,
                                    }}
                                    contentFit='contain'
                                    source={require('../../assets/coins-in-hand.png')}
                                />
                                <View>
                                    <Text
                                        style={{
                                            color: Color.textColor,
                                            fontSize: FontSize.xs,
                                            fontWeight: '500',
                                        }}
                                    >
                                        Coins
                                    </Text>
                                    <Text
                                        style={{
                                            color: Color.textColor,
                                            fontSize: FontSize.md,
                                            fontWeight: '800',
                                        }}
                                    >
                                        200
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Card */}

                        <TouchableOpacity activeOpacity={1} style={{ marginTop: 30 }}>
                            <ImageBackground
                                source={require('../../assets/bg1.png')}
                                resizeMode='cover'
                                style={{
                                    width: '100%',
                                    borderRadius: 14,
                                    overflow: 'hidden',
                                }}
                            >
                                <View
                                    style={{
                                        paddingHorizontal: 26,
                                        paddingVertical: 20,
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            gap: 10,
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Image
                                            style={{
                                                width: 80,
                                                height: 80,
                                            }}
                                            contentFit='contain'
                                            source={require('../../assets/chess.png')}
                                        />
                                        <View>
                                            <Text
                                                style={{
                                                    color: Color.textColor,
                                                    fontSize: FontSize.md,
                                                    fontWeight: '800',
                                                }}
                                            >
                                                Play Online
                                            </Text>
                                            <Text
                                                style={{
                                                    color: Color.textColor,
                                                    fontSize: FontSize.xs,
                                                    fontWeight: '800',
                                                    marginTop: 6,
                                                }}
                                            >
                                                500k People playing
                                            </Text>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            gap: 20,
                                            marginTop: 20,
                                        }}
                                    >
                                        <GeneralButton
                                            onPress={() => handlePlayOnineClick('Online', 5)}
                                            width={120}
                                            paddingVertical={6}
                                            title='5min Match'
                                            borderRadius={14}
                                        />
                                        <GeneralButton
                                            onPress={() => handlePlayOnineClick('Online', 10)}
                                            width={120}
                                            paddingVertical={6}
                                            title='10min Match'
                                            borderRadius={14}
                                        />
                                        <GeneralButton
                                            onPress={() => handlePlayOnineClick('Online', 15)}
                                            width={120}
                                            paddingVertical={6}
                                            title='15min Match'
                                            borderRadius={14}
                                        />
                                    </View>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>

                        {/* Play with ai card */}
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedMode('Ai');
                                setTimer(5);
                                navigation.navigate('Game');
                            }}
                            activeOpacity={0.5}
                            style={{ marginTop: 30 }}
                        >
                            <ImageBackground
                                source={require('../../assets/bg1.png')}
                                resizeMode='cover'
                                style={{
                                    width: '100%',
                                    borderRadius: 14,
                                    overflow: 'hidden',
                                }}
                            >
                                <View
                                    style={{
                                        paddingHorizontal: 26,
                                        paddingVertical: 20,
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            gap: 10,
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Image
                                            style={{
                                                width: 80,
                                                height: 80,
                                            }}
                                            contentFit='contain'
                                            source={require('../../assets/robot.png')}
                                        />
                                        <View>
                                            <Text
                                                style={{
                                                    color: Color.textColor,
                                                    fontSize: FontSize.md,
                                                    fontWeight: '800',
                                                }}
                                            >
                                                Play with Ai
                                            </Text>
                                            <Text
                                                style={{
                                                    color: Color.textColor,
                                                    fontSize: FontSize.xs,
                                                    fontWeight: '800',
                                                    marginTop: 6,
                                                }}
                                            >
                                                Test your skills with Ai
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>

                        {/* Create Room card */}
                        <TouchableOpacity activeOpacity={1} style={{ marginTop: 30 }}>
                            <ImageBackground
                                source={require('../../assets/bg1.png')}
                                resizeMode='cover'
                                style={{
                                    width: '100%',
                                    borderRadius: 14,
                                    overflow: 'hidden',
                                }}
                            >
                                <View
                                    style={{
                                        paddingHorizontal: 26,
                                        paddingVertical: 20,
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            gap: 10,
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Image
                                            style={{
                                                width: 80,
                                                height: 80,
                                            }}
                                            contentFit='contain'
                                            source={require('../../assets/rectangle.png')}
                                        />
                                        <View>
                                            <Text
                                                style={{
                                                    color: Color.textColor,
                                                    fontSize: FontSize.md,
                                                    fontWeight: '800',
                                                }}
                                            >
                                                Create Room
                                            </Text>
                                            <Text
                                                style={{
                                                    color: Color.textColor,
                                                    fontSize: FontSize.xs,
                                                    fontWeight: '800',
                                                    marginTop: 6,
                                                }}
                                            >
                                                Play with friends
                                            </Text>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            gap: 20,
                                            marginTop: 20,
                                        }}
                                    >
                                        <GeneralButton
                                            onPress={handleCreateRoom}
                                            width={120}
                                            paddingVertical={6}
                                            title='Create Room'
                                            borderRadius={14}
                                        />
                                        <GeneralButton
                                            onPress={handleJoinRoom}
                                            width={120}
                                            paddingVertical={6}
                                            title='Enter Room'
                                            borderRadius={14}
                                        />
                                    </View>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <BottomNav />
        </SafeAreaView>
    );
};

export default Home;
