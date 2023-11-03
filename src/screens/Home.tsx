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

const Home = ({ navigation }) => {
    const { width } = useWindowDimensions();

    const handleClick = () => {
        console.log("button clicked");
    }

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
                            paddingVertical: 20,
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
                                        <GeneralButton onPress={handleClick}
                                            width={120}
                                            paddingVertical={6}
                                            title='5min Match'
                                        />
                                        <GeneralButton onPress={handleClick}
                                            width={120}
                                            paddingVertical={6}
                                            title='10min Match'
                                        />
                                        <GeneralButton onPress={handleClick}
                                            width={120}
                                            paddingVertical={6}
                                            title='15min Match'
                                        />
                                    </View>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>

                        {/* Play with ai card */}
                        <TouchableOpacity activeOpacity={0.5} style={{ marginTop: 30 }}>
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
                                        <GeneralButton onPress={handleClick}
                                            width={120}
                                            paddingVertical={6}
                                            title='Create Room'
                                        />
                                        <GeneralButton onPress={handleClick}
                                            width={120}
                                            paddingVertical={6}
                                            title='Enter Room'
                                        />
                                    </View>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                )}
            />
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
                <GeneralButton onPress={handleClick} width={68} paddingVertical={6} title='Home' />
                <GeneralButton onPress={handleClick} width={68} paddingVertical={6} title='Lobby' />
                <GeneralButton onPress={handleClick} width={68} paddingVertical={6} title='Watch' />
                <GeneralButton onPress={handleClick} width={68} paddingVertical={6} title='More' />
            </View>
        </SafeAreaView>
    );
};

export default Home;
