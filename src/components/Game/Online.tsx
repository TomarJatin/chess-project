import { View, Text, ImageBackground, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useContext, useState, useEffect } from 'react';
import Chess from '../../components/ChessBoard';
import Modal from 'react-native-modal';
import { Color, FontSize } from '../../../GlobalStyle';
import { GameContext } from '../../contexts';
import GeneralButton from '../General/Button';
import { useNavigation } from '@react-navigation/native';
import BottomNav from '../General/BottomNav';
import useWebSocket, { ReadyState } from 'react-native-use-websocket';
import InCallManager from 'react-native-incall-manager';

import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStream,
    MediaStreamTrack,
    mediaDevices,
    registerGlobals,
} from 'react-native-webrtc';

const Online = () => {
    const navigation = useNavigation();
    const { selectedMode, timer, color, matchId, authToken } = useContext(GameContext);
    const [open, setOpen] = useState('');
    const [yourTimer, setYourTimer] = useState(timer * 60);
    const [opponentTimer, setOpponentTimer] = useState(timer * 60);
    const [yourTimerActive, setYourTimerActive] = useState(false);
    const [opponentTimerActive, setOpponentTimerActive] = useState(false);
    const [localStream, setLocalStream] = useState({ toURL: () => null });
    const [remoteStream, setRemoteStream] = useState({ toURL: () => null });
    const [yourConn, setYourConn] = useState(
        //change the config as you need
        new RTCPeerConnection({
            iceServers: [
                {
                    urls: 'stun:stun.l.google.com:19302',
                },
                {
                    urls: 'stun:stun1.l.google.com:19302',
                },
                {
                    urls: 'stun:stun2.l.google.com:19302',
                },
            ],
        })
    );
    const [offer, setOffer] = useState(null);
    const socketUrl = 'ws://139.59.94.85:3000/ws/' + authToken;
    const { sendMessage, sendJsonMessage, lastMessage, lastJsonMessage, readyState, getWebSocket } =
        useWebSocket(socketUrl, {
            onOpen: () => console.log('opened'),
            //Will attempt to reconnect on all close events, such as server shutting down
            shouldReconnect: (closeEvent) => true,
        });

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];
    const submitMessage = (message) => {
        sendMessage(JSON.stringify(message));
    };

    const handleExit = () => {
        submitMessage({
            messageType: 'chat',
            data: {
                matchId: matchId,
                chatType: 'players',
                chatData: {
                    won: 'You won',
                },
            },
        });
    };

    useEffect(() => {
        let interval;

        if (yourTimerActive && yourTimer > 0) {
            interval = setInterval(() => {
                setYourTimer((prevSeconds) => prevSeconds - 1);
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [yourTimerActive, yourTimer]);

    useEffect(() => {
        let interval;

        if (opponentTimerActive && opponentTimer > 0) {
            interval = setInterval(() => {
                setOpponentTimer((prevSeconds) => prevSeconds - 1);
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [opponentTimer, opponentTimerActive]);

    useEffect(() => {
        console.log('connection status: ', connectionStatus);
    }, [connectionStatus]);

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const remainingSeconds = timeInSeconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <>
            <SafeAreaView
                style={{
                    display: 'flex',
                    flex: 1,
                    alignItems: 'center',
                    backgroundColor: Color.backgroundColor,
                    paddingVertical: 20,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 14,
                        width: '100%',
                        paddingHorizontal: 15,
                    }}
                >
                    <GeneralButton
                        onPress={() => navigation.goBack()}
                        width={68}
                        paddingVertical={6}
                        borderRadius={14}
                        title='Back'
                    />
                    <Text
                        style={{ color: Color.textColor, fontWeight: '800', fontSize: FontSize.sm }}
                    >
                        Game Online
                    </Text>
                </View>
                <View
                    style={{
                        display: 'flex',
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: Dimensions.get('window').height,
                    }}
                >
                    <View style={{ width: '100%', marginTop: 30 }}>
                        {/* Player 1 */}
                        <ImageBackground
                            source={require('../../../assets/bg.jpeg')}
                            resizeMode='cover'
                            style={{
                                width: Dimensions.get('window').width,
                            }}
                        >
                            <View
                                style={{
                                    width: '100%',
                                    paddingHorizontal: 30,
                                    paddingVertical: 15,
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: 14,
                                    }}
                                >
                                    <Image
                                        style={{
                                            width: 34,
                                            height: 34,
                                            borderRadius: 17,
                                        }}
                                        contentFit='contain'
                                        source={require('../../../assets/robot.png')}
                                    />
                                    <View>
                                        <Text
                                            style={{
                                                color: Color.textColor,
                                                fontSize: FontSize.xs13,
                                                fontWeight: '800',
                                            }}
                                        >
                                            {color === 'b' ? 'You' : 'Opponent'}
                                        </Text>
                                        <Text
                                            style={{
                                                color: Color.textColor,
                                                fontSize: FontSize.xxs,
                                                fontWeight: '400',
                                                marginTop: 3,
                                            }}
                                        >
                                            {formatTime(color === 'b' ? yourTimer : opponentTimer)}
                                        </Text>
                                    </View>
                                    <Image
                                        style={{
                                            width: 18,
                                            height: 12,
                                        }}
                                        contentFit='contain'
                                        source={{
                                            uri: 'https://cdn.britannica.com/97/1597-004-05816F4E/Flag-India.jpg',
                                        }}
                                    />
                                </View>
                            </View>
                        </ImageBackground>
                        <View style={{ width: '100%', marginVertical: 6 }}>
                            <Chess
                                setOpponentTimerActive={setOpponentTimerActive}
                                setYourTimerActive={setYourTimerActive}
                            />
                        </View>
                        <ImageBackground
                            source={require('../../../assets/fire.gif')}
                            resizeMode='cover'
                            style={{
                                width: Dimensions.get('window').width,
                            }}
                        >
                            <View
                                style={{
                                    width: '100%',
                                    paddingHorizontal: 30,
                                    paddingVertical: 15,
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: 14,
                                    }}
                                >
                                    <Image
                                        style={{
                                            width: 34,
                                            height: 34,
                                            borderRadius: 17,
                                        }}
                                        contentFit='contain'
                                        source={require('../../../assets/robot.png')}
                                    />
                                    <View>
                                        <Text
                                            style={{
                                                color: Color.textColor,
                                                fontSize: FontSize.xs13,
                                                fontWeight: '800',
                                            }}
                                        >
                                            {color === 'w' ? 'You' : 'Opponent'}
                                        </Text>
                                        <Text
                                            style={{
                                                color: Color.textColor,
                                                fontSize: FontSize.xxs,
                                                fontWeight: '400',
                                                marginTop: 3,
                                            }}
                                        >
                                            {formatTime(color === 'w' ? yourTimer : opponentTimer)}
                                        </Text>
                                    </View>
                                    <Image
                                        style={{
                                            width: 18,
                                            height: 12,
                                        }}
                                        contentFit='contain'
                                        source={{
                                            uri: 'https://cdn.britannica.com/97/1597-004-05816F4E/Flag-India.jpg',
                                        }}
                                    />
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                </View>
                <View
                    style={{
                        width: '100%',
                        padding: 20,
                        position: 'absolute',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        bottom: 0,
                    }}
                >
                    <GeneralButton
                        onPress={handleExit}
                        width={68}
                        paddingVertical={6}
                        title='Exit'
                        borderRadius={14}
                    />
                    <GeneralButton
                        onPress={() => {}}
                        width={68}
                        paddingVertical={6}
                        title='Info'
                        borderRadius={14}
                    />
                    <GeneralButton
                        onPress={() => setOpen('chat')}
                        width={68}
                        paddingVertical={6}
                        title='Chat'
                        borderRadius={14}
                    />
                    <GeneralButton
                        onPress={() => {}}
                        width={68}
                        paddingVertical={6}
                        title='More'
                        borderRadius={14}
                    />
                </View>
            </SafeAreaView>
            <Modal
                isVisible={open !== ''}
                onSwipeComplete={() => setOpen('')}
                onBackdropPress={() => setOpen('')}
                onBackButtonPress={() => setOpen('')}
                style={{
                    justifyContent: 'flex-end',
                    margin: 0,
                }}
            >
                {open === 'chat' && (
                    <View
                        style={{
                            backgroundColor: Color.darkCardInside,
                            padding: 22,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            borderColor: 'rgba(0, 0, 0, 0.1)',
                        }}
                    ></View>
                )}
            </Modal>
        </>
    );
};

export default Online;
