import { View, Text, ImageBackground, Dimensions, TextInput } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useContext, useState, useEffect, useRef, useMemo } from 'react';
import Chess from '../../components/ChessBoard';
import Modal from 'react-native-modal';
import { Color, FontSize } from '../../../GlobalStyle';
import { GameContext } from '../../contexts';
import GeneralButton from '../General/Button';
import { useNavigation } from '@react-navigation/native';
import BottomNav from '../General/BottomNav';
import useWebSocket, { ReadyState } from 'react-native-use-websocket';
import InCallManager from 'react-native-incall-manager';
import Toast from 'react-native-simple-toast';

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
import { ChatContext } from '../../contexts/chat';
import { FlatList } from 'dripsy';

const Online = () => {
    const navigation = useNavigation();
    const {
        selectedMode,
        timer,
        color,
        matchId,
        authToken,
        identifier,
        joinRoom,
        setJoinRoom,
        setColor,
        setMatchId,
        setPrevInstance,
    } = useContext(GameContext);
    const { chatMessages, setChatMessages } = useContext(ChatContext);
    const [chatMessage, setChatMessage] = useState('');
    const [open, setOpen] = useState('');
    const [yourTimer, setYourTimer] = useState(timer * 60);
    const [opponentTimer, setOpponentTimer] = useState(timer * 60);
    const [yourTimerActive, setYourTimerActive] = useState(false);
    const [opponentTimerActive, setOpponentTimerActive] = useState(false);
    const socketUrl = 'wss://closm.com/ws/' + authToken;
    const { sendMessage, sendJsonMessage, lastMessage, lastJsonMessage, readyState, getWebSocket } =
        useWebSocket(socketUrl, {
            onOpen: () => console.log('opened'),
            //Will attempt to reconnect on all close events, such as server shutting down
            shouldReconnect: (closeEvent) => true,
        });
    let name;
    let connectedUser;
    const [calling, setCalling] = useState(false);
    // Video Scrs
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

    const [callToUsername, setCallToUsername] = useState('abcd');

    const addChatMessages = (message: string, fromUser: boolean) => {
        let _messages: any = chatMessages;
        _messages.push({
            message: message,
            fromUser: fromUser,
        });
        setChatMessages([..._messages]);
    };

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
    useEffect(() => {
        console.log('connection status: ', connectionStatus);
        if (connectionStatus === 'Open') {
            try {
                InCallManager.start();
                InCallManager.setKeepScreenOn(true);
                InCallManager.setForceSpeakerphoneOn(true);

                return () => {
                    InCallManager.stop();
                };
            } catch (err) {
                console.log('InApp Caller ---------------------->', err);
            }
        }
    }, [connectionStatus]);

    const checkRtcMessages = (data: any) => {
        console.log('Data --------------------->', data);
        switch (data.type) {
            case 'login':
                console.log('Login');
                break;
            //when somebody wants to call us
            case 'offer':
                handleOffer(data.offer, data.name);
                console.log('Offer');
                break;
            case 'answer':
                handleAnswer(data.answer);
                console.log('Answer');
                break;
            //when a remote peer sends an ice candidate to us
            case 'candidate':
                handleCandidate(data.candidate);
                console.log('Candidate');
                break;
            case 'leave':
                handleLeave();
                console.log('Leave');
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        /**
         *
         * Sockets Signalling
         */
        //when we got a message from a signaling server
        /**
         * Socjket Signalling Ends
         */

        let isFront = false;
        mediaDevices.enumerateDevices().then((sourceInfos: any) => {
            let videoSourceId;
            for (let i = 0; i < sourceInfos.length; i++) {
                const sourceInfo = sourceInfos[i];
                if (
                    sourceInfo.kind == 'videoinput' &&
                    sourceInfo.facing == (isFront ? 'front' : 'environment')
                ) {
                    videoSourceId = sourceInfo.deviceId;
                }
            }
            mediaDevices
                .getUserMedia({
                    audio: true,
                    //   video: {
                    //     mandatory: {
                    //       minWidth: 500, // Provide your own width, height and frame rate here
                    //       minHeight: 300,
                    //       minFrameRate: 30,
                    //     },
                    //     facingMode: isFront ? 'user' : 'environment',
                    //     optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
                    //   },
                    video: false,
                })
                .then((stream) => {
                    // Got stream!
                    setLocalStream(stream);

                    // setup stream listening
                    yourConn.addStream(stream);
                })
                .catch((error) => {
                    // Log error
                });
        });

        yourConn.onaddstream = (event) => {
            console.log('On Add Stream', event);
            setRemoteStream(event.stream);
        };

        // Setup ice handling
        yourConn.onicecandidate = (event) => {
            if (event.candidate) {
                send({
                    type: 'candidate',
                    candidate: event.candidate,
                });
            }
        };
    }, []);

    useEffect(() => {
        console.log("lastJsonMessage: ", lastJsonMessage);
        console.log("lastMessage: ", lastMessage);
        if (Object.keys(lastJsonMessage).length !== 0) {
            console.log(lastJsonMessage);
            Toast.show(JSON.stringify(lastJsonMessage), Toast.LONG);
            if (lastJsonMessage?.data?.rtc) {
                console.log(lastJsonMessage);
                checkRtcMessages(lastJsonMessage?.data?.rtc);
            }
            if (lastJsonMessage?.data?.color && lastJsonMessage?.data?.matchId) {
                let _color = lastJsonMessage.data.color === 'white' ? 'w' : 'b';
                setColor(_color);
                setMatchId(lastJsonMessage.data.matchId);
                setPrevInstance(null);
            }
        }
    }, [lastJsonMessage, lastMessage]);

    const send = (message) => {
        //attach the other peer username to our messages

        if (connectedUser) {
            message.name = connectedUser;
            console.log('Connected iser in end----------', message);
        }

        if(connectionStatus === "Open"){
            submitMessage({
                messageType: 'chat',
                data: {
                    matchId: matchId,
                    chatType: 'players',
                    chatData: {
                        rtc: message,
                    },
                },
            });
        }else{
            Toast.show("connection error: "+connectionStatus, Toast.LONG);
        }

       
    };

    const onCall = () => {
        setCalling(true);

        connectedUser = callToUsername;
        console.log('Caling to', callToUsername);
        // create an offer

        yourConn.createOffer().then((offer) => {
            yourConn.setLocalDescription(offer).then(() => {
                console.log('Sending Ofer');
                console.log(offer);
                send({
                    type: 'offer',
                    offer: offer,
                });
                // Send pc.localDescription to peer
            });
        });
    };

    //when somebody sends us an offer
    const handleOffer = async (offer, name) => {
        console.log(name + ' is calling you.');

        console.log('Accepting Call===========>', offer);
        connectedUser = name;

        try {
            await yourConn.setRemoteDescription(new RTCSessionDescription(offer));

            const answer = await yourConn.createAnswer();

            await yourConn.setLocalDescription(answer);
            send({
                type: 'answer',
                answer: answer,
            });
        } catch (err) {
            Toast.show('Offerr Error'+err, Toast.LONG);
            console.log('Offerr Error', err);
        }
    };

    //when we got an answer from a remote user
    const handleAnswer = (answer) => {
        yourConn.setRemoteDescription(new RTCSessionDescription(answer));
    };

    //when we got an ice candidate from a remote user
    const handleCandidate = (candidate) => {
        setCalling(false);
        console.log('Candidate ----------------->', candidate);
        yourConn.addIceCandidate(new RTCIceCandidate(candidate));
    };

    //hang up
    const hangUp = () => {
        send({
            type: 'leave',
        });

        handleLeave();
    };

    const handleLeave = () => {
        connectedUser = null;
        setRemoteStream({ toURL: () => null });

        yourConn.close();
        // yourConn.onicecandidate = null;
        // yourConn.onaddstream = null;
    };

    const acceptCall = async () => {
        console.log('Accepting Call===========>', offer);
        connectedUser = offer.name;

        try {
            await yourConn.setRemoteDescription(new RTCSessionDescription(offer));

            const answer = await yourConn.createAnswer();

            await yourConn.setLocalDescription(answer);

            send({
                type: 'answer',
                answer: answer,
            });
        } catch (err) {
            console.log('Offerr Error', err);
            Toast.show("Offer err: "+err, Toast.LONG);
        }
    };
    const rejectCall = async () => {
        send({
            type: 'leave',
        });
        ``;
        setOffer(null);

        handleLeave();
    };

    const sendChatMessage = () => {
        if (chatMessage === '') {
            return;
        }
       if(connectionStatus === "Open"){
        submitMessage({
            messageType: 'chat',
            data: {
                matchId: matchId,
                chatType: 'players',
                chatData: {
                    message: {
                        text: chatMessage,
                        identifier: identifier,
                    },
                },
            },
        });
       }else{
        Toast.show("connection error:  "+connectionStatus, Toast.LONG);
       }
        setChatMessage('');
    };

    const handleExit = () => {
        // submitMessage({
        //     messageType: 'chat',
        //     data: {
        //         matchId: matchId,
        //         chatType: 'players',
        //         chatData: {
        //             won: 'You won',
        //         },
        //     },
        // });
        console.log('handleExit');
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

    const handleJoinRoom = () => {
        if(connectionStatus === "Open"){
            submitMessage({
                messageType: 'roomJoin',
                data: {
                    matchType: timer + 'min',
                },
            });
        }
        else{
            Toast.show("connection error: "+connectionStatus, Toast.LONG);
        }
        
    };

    useEffect(() => {
        if (joinRoom && connectionStatus === "Open") {
            handleJoinRoom();
            setJoinRoom(false);
        }
    }, [connectionStatus]);

    // useEffect(() => {
    //     console.log('connection status: ', connectionStatus);
    // }, [connectionStatus]);

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
                <Text
                                            style={{
                                                color: Color.textColor,
                                                fontSize: FontSize.xs13,
                                                fontWeight: '800',
                                            }}
                                        >
                                            Connection status: {connectionStatus}
                                        </Text>
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
                                <RTCView
                                    streamURL={
                                        color === 'b' ? localStream.toURL() : remoteStream.toURL()
                                    }
                                />
                            </View>
                        </ImageBackground>
                        <View style={{ width: '100%', marginVertical: 6 }}>
                            <Chess
                                setOpponentTimerActive={setOpponentTimerActive}
                                setYourTimerActive={setYourTimerActive}
                                sendMessage={sendMessage}
                                sendJsonMessage={sendJsonMessage}
                                lastMessage={lastMessage}
                                lastJsonMessage={lastJsonMessage}
                                readyState={readyState}
                                getWebSocket={getWebSocket}
                                connectionStatus={connectionStatus}
                                submitMessage={submitMessage}
                                yourTimer={yourTimer}
                                opponentTimer={opponentTimer}
                                addChatMessages={addChatMessages}
                                onCall={onCall}
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
                                <RTCView
                                    streamURL={
                                        color === 'w' ? localStream.toURL() : remoteStream.toURL()
                                    }
                                />
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
                    >
                        {chatMessages.length === 0 && (
                            <Text
                                style={{
                                    color: Color.textColor,
                                    fontSize: FontSize.xs13,
                                    fontWeight: '800',
                                }}
                            >
                                No chats here
                            </Text>
                        )}
                        <FlatList
                            data={chatMessages}
                            renderItem={({ item, index }) => (
                                <View
                                    key={index}
                                    style={{
                                        width: '100%',
                                        flexDirection: 'column',
                                        alignItems: item?.fromUser ? 'flex-end' : 'flex-start',
                                        marginBottom: 20,
                                    }}
                                >
                                    <View
                                        style={{
                                            width: Dimensions.get('window').width * 0.7,
                                            flexDirection: 'column',
                                            alignItems: item?.fromUser ? 'flex-end' : 'flex-start',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: Color.textColor,
                                                fontSize: FontSize.xs13,
                                                fontWeight: '800',
                                            }}
                                        >
                                            {item?.fromUser ? 'You' : 'Opponent'}
                                        </Text>
                                        <Text
                                            style={{
                                                color: Color.textColor,
                                                fontSize: FontSize.xxs,
                                                fontWeight: '800',
                                                marginTop: 4,
                                            }}
                                        >
                                            {item?.message}
                                        </Text>
                                    </View>
                                </View>
                            )}
                            style={{
                                height: Dimensions.get('window').height * 0.5,
                                width: '100%',
                            }}
                        />
                        <View
                            style={{
                                marginTop: 20,
                                paddingVertical: 5,
                                paddingHorizontal: 20,
                                borderRadius: 100,
                                borderWidth: 2,
                                borderColor: '#60CBFA',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            <TextInput
                                style={{
                                    color: Color.textColor,
                                    fontWeight: '800',
                                    fontSize: FontSize.xs,
                                    width: '60%',
                                }}
                                placeholder=' Enter your message'
                                placeholderTextColor={Color.textColor}
                                value={chatMessage}
                                onChangeText={(value) => setChatMessage(value)}
                            />
                            <GeneralButton
                                onPress={sendChatMessage}
                                width={68}
                                paddingVertical={6}
                                title='Send'
                                borderRadius={14}
                            />
                        </View>
                    </View>
                )}
            </Modal>
        </>
    );
};

export default Online;
