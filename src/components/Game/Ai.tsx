import { View, Text, ImageBackground, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useContext, useState, useEffect, useRef, useMemo } from 'react';
import Chess from '../../components/ChessBoard';
import { Color, FontSize } from '../../../GlobalStyle';
import { GameContext } from '../../contexts';
import GeneralButton from '../General/Button';
import { useNavigation } from '@react-navigation/native';
import BottomNav from '../General/BottomNav';

const Ai = () => {
    const navigation = useNavigation();
    const { selectedMode, timer } = useContext(GameContext);
    const [yourTimer, setYourTimer] = useState(timer * 60);
    const [opponentTimer, setOpponentTimer] = useState(timer * 60);
    const [yourTimerActive, setYourTimerActive] = useState(false);
    const [opponentTimerActive, setOpponentTimerActive] = useState(false);

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const remainingSeconds = timeInSeconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const handleClick = () => {
        console.log('button clicked');
    };

    const handleLobbyClick = () => {
        console.log('Lobby clicked');
    };

    useEffect(() => {
        setYourTimerActive(true);
        setOpponentTimerActive(false);
    }, [])

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

    return (
        <SafeAreaView style={{ display: 'flex', flex: 1, alignItems: 'center', backgroundColor: Color.backgroundColor, paddingVertical: 20}}>
            <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 14,
                        width: "100%",
                        paddingHorizontal: 15
                    }}
                >
                    <GeneralButton
                        onPress={() => navigation.goBack()}
                        width={68}
                        paddingVertical={6}
                        title='Back'
                        borderRadius={14}
                    />
                    <Text
                        style={{ color: Color.textColor, fontWeight: '800', fontSize: FontSize.sm }}
                    >
                        Game #145542
                    </Text>
                </View>
            <View
                style={{
                    display: 'flex',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: Dimensions.get("window").height
                }}
            >
                 
                <View style={{width: "100%", marginTop: 30}}>
                    {/* Player 1 */}
                    <ImageBackground
                                source={require('../../../assets/bg.jpeg')}
                                resizeMode='cover'
                                style={{
                                    width: Dimensions.get("window").width,
                                }}
                            >
                                <View style={{
                                    width: "100%",
                                    paddingHorizontal: 30,
                                    paddingVertical: 15
                                }}>
                                    <View style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 14
                                    }}>
                                    <Image
                                            style={{
                                                width: 34,
                                                height: 34,
                                                borderRadius: 17
                                            }}
                                            contentFit='contain'
                                            source={require('../../../assets/robot.png')}
                                        />
                                        <View>
                                            <Text style={{color: Color.textColor, fontSize: FontSize.xs13, fontWeight: "800"}}>Ai</Text>
                                            <Text style={{color: Color.textColor, fontSize: FontSize.xxs, fontWeight: "400", marginTop: 3}}>{formatTime(opponentTimer)}</Text>
                                        </View>
                                        <Image
                                            style={{
                                                width: 18,
                                                height: 12,
                                            }}
                                            contentFit='contain'
                                            source={{uri: "https://cdn.britannica.com/97/1597-004-05816F4E/Flag-India.jpg"}}
                                        />
                                    </View>
                                </View>
                            </ImageBackground>
                            <View style={{width: "100%", marginVertical: 6}}>
                            <Chess 
                            yourTimer={yourTimer}
                            opponentTimer={opponentTimer}
                            setOpponentTimerActive={setOpponentTimerActive}
                            setYourTimerActive={setYourTimerActive}
                            />
                            </View>
                            <ImageBackground
                                source={require('../../../assets/fire.gif')}
                                resizeMode='cover'
                                style={{
                                    width: Dimensions.get("window").width,
                                }}
                            >
                                <View style={{
                                    width: "100%",
                                    paddingHorizontal: 30,
                                    paddingVertical: 15
                                }}>
                                    <View style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 14
                                    }}>
                                    <Image
                                            style={{
                                                width: 34,
                                                height: 34,
                                                borderRadius: 17
                                            }}
                                            contentFit='contain'
                                            source={require('../../../assets/robot.png')}
                                        />
                                        <View>
                                            <Text style={{color: Color.textColor, fontSize: FontSize.xs13, fontWeight: "800"}}>Ai</Text>
                                            <Text style={{color: Color.textColor, fontSize: FontSize.xxs, fontWeight: "400", marginTop: 3}}>{formatTime(yourTimer)}</Text>
                                        </View>
                                        <Image
                                            style={{
                                                width: 18,
                                                height: 12,
                                            }}
                                            contentFit='contain'
                                            source={{uri: "https://cdn.britannica.com/97/1597-004-05816F4E/Flag-India.jpg"}}
                                        />
                                    </View>
                                </View>
                            </ImageBackground>
                </View>
                
            </View>
            <BottomNav />
        </SafeAreaView>
    );
};

export default Ai;
