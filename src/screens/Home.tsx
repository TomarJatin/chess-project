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
import { useContext, useEffect, useRef } from 'react';
import { GameContext } from '../contexts';
import BottomNav from '../components/General/BottomNav';

const Home = ({ navigation }) => {
    const { width } = useWindowDimensions();
    const { setSelectedMode, setTimer, submitMessage, setColor, ws, setMatchId, identifier, authToken } = useContext(GameContext);

    useEffect(() => {
        ws.onopen = () => {
            console.log('connection successful');
        };
        ws.onclose = (e) => {
            console.log('closed connection');
        };
        ws.onerror = (e) => {
            console.log('error is', e);
        };
    }, []);

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

    const handlePlayOnineClick = (mode: string, timer: number) => {
        setSelectedMode(mode);
        setTimer(timer);
        submitMessage({
            messageType: 'currentMatch',
        });
            ws.onmessage = (e) => {
                console.log("message2", e.data);
                if(JSON.parse(e.data).data.color){
                    let _color = JSON.parse(e.data).data.color === "white" ? "w" : "b";
                    console.log("color: ", _color);
                    setColor(_color);
                }
                if(JSON.parse(e.data).data.matchId){
                    console.log("matchId: ", JSON.parse(e.data).data.matchId);
                    setMatchId(JSON.parse(e.data).data.matchId)
                }
                if(JSON.parse(e.data).data.error && JSON.parse(e.data).data.error === "no match found"){
                    console.log(JSON.parse(e.data).data.error);
                    submitMessage({
                        messageType: 'roomJoin',
                        data: {
                            matchType: timer + 'min',
                        },
                    });
                }
                if(JSON.parse(e.data).data.matchType){
                    console.log("matchtype: ", JSON.parse(e.data).data.matchType);
                    if (JSON.parse(e.data).data.matchType === '15min') {
                        setTimer(15);
                    } else if (JSON.parse(e.data).data.matchType === '10min') {
                        setTimer(15);
                    } else {
                        setTimer(5);
                    }
                }
                if(JSON.parse(e.data).data.whitePiece){
                    const _color = JSON.parse(e.data).data.whitePiece === identifier ? 'w': 'b';
                    setColor(_color);
                }
            };
            setTimeout(() => navigation.navigate('Game'), 1000);
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
                                source={require('../../assets/bg.png')}
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
                                source={require('../../assets/bg.png')}
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
                                source={require('../../assets/bg.png')}
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
