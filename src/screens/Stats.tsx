import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput } from 'dripsy';
import { Dimensions, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { Color, FontSize } from '../../GlobalStyle';
import { Image } from 'expo-image';
import GeneralButton from '../components/General/Button';
import BottomNav from '../components/General/BottomNav';

export default function Stats({ navigation }) {
    const handleClick = () => {
        console.log('button clicked');
    };

    return (
        <SafeAreaView>
            <View
                style={{
                    minHeight: Dimensions.get('window').height,
                    backgroundColor: Color.backgroundColor,
                    padding: 15,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 14,
                        marginBottom: 30
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
                        Statistics
                    </Text>
                </View>

                {/* Stats */}

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
                                width: "100%",
                                justifyContent: "space-between",
                                alignItems: 'center',
                            }}
                        >
                            <View>
                                <Text
                                    style={{
                                        color: Color.textColor,
                                        fontSize: FontSize.xs,
                                        fontWeight: '500',
                                        textAlign: "center"
                                    }}
                                >
                                    Games
                                </Text>
                                <Text
                                    style={{
                                        color: Color.textColor,
                                        fontSize: FontSize.md,
                                        fontWeight: '800',
                                        textAlign: "center"
                                    }}
                                >
                                    20
                                </Text>
                            </View>
                            <View>
                                <Text
                                    style={{
                                        color: Color.textColor,
                                        fontSize: FontSize.xs,
                                        fontWeight: '500',
                                        textAlign: "center"
                                    }}
                                >
                                    Coins Earned
                                </Text>
                                <Text
                                    style={{
                                        color: Color.textColor,
                                        fontSize: FontSize.md,
                                        fontWeight: '800',
                                        textAlign: "center"
                                    }}
                                >
                                    2000
                                </Text>
                            </View>
                            <View>
                                <Text
                                    style={{
                                        color: Color.textColor,
                                        fontSize: FontSize.xs,
                                        fontWeight: '500',
                                        textAlign: "center"
                                    }}
                                >
                                    Wins
                                </Text>
                                <Text
                                    style={{
                                        color: Color.textColor,
                                        fontSize: FontSize.md,
                                        fontWeight: '800',
                                        textAlign: "center"
                                    }}
                                >
                                    2
                                </Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>

                {/* All Games */}
                <Text style={{
                    color: Color.textColor,
                    fontWeight: "800",
                    fontSize: FontSize.md,
                    marginTop: 27
                }}>
                    All Games
                </Text>

                <FlatList 
                data={["1"]}
                renderItem={() => (
                    <View style={{
                        marginBottom: 20,
                        width: "100%",
                        paddingVertical: 8,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between"
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
                                            source={require('../../assets/robot.png')}
                                        />
                                        <View>
                                            <Text style={{color: Color.textColor, fontSize: FontSize.xs13, fontWeight: "800"}}>Ai</Text>
                                            <Text style={{color: Color.textColor, fontSize: FontSize.xxs, fontWeight: "400", marginTop: 3}}>08:60 Min</Text>
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
                                    <Text style={{
                                        fontSize: FontSize.xs,
                                        fontWeight: "800",
                                        color: Color.greenText
                                    }}>
                                        You Won
                                    </Text>
                    </View>
                )}
                style={{
                    marginTop: 20
                }}
                />
            </View>
            <BottomNav />
        </SafeAreaView>
    );
}
