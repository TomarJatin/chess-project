import { View, Text, ImageBackground, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useContext } from 'react';
import Chess from '../../components/ChessBoard';
import { Color, FontSize } from '../../../GlobalStyle';
import { GameContext } from '../../contexts';
import GeneralButton from '../General/Button';
import { useNavigation } from '@react-navigation/native';
import BottomNav from '../General/BottomNav';

const Online = () => {
    const navigation = useNavigation();
    const { selectedMode, timer, color } = useContext(GameContext);

    return (
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
                <Text style={{ color: Color.textColor, fontWeight: '800', fontSize: FontSize.sm }}>
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
                                        Player 2
                                    </Text>
                                    <Text
                                        style={{
                                            color: Color.textColor,
                                            fontSize: FontSize.xxs,
                                            fontWeight: '400',
                                            marginTop: 3,
                                        }}
                                    >
                                        00:60
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
                        <Chess color={color} />
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
                                        Player 1
                                    </Text>
                                    <Text
                                        style={{
                                            color: Color.textColor,
                                            fontSize: FontSize.xxs,
                                            fontWeight: '400',
                                            marginTop: 3,
                                        }}
                                    >
                                        00:60
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
            <BottomNav />
        </SafeAreaView>
    );
};

export default Online;
