import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput } from 'dripsy';
import { Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Color, FontSize } from '../../GlobalStyle';
import GeneralButton from '../components/General/Button';

export default function CreateLobby({ navigation }) {

    const handleClick = () => {
        console.log("button clicked");
    }

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
                    }}
                >
                    <GeneralButton
                        onPress={() => navigation.goBack()}
                        width={68}
                        paddingVertical={6}
                        title='Back'
                    />
                    <Text
                        style={{ color: Color.textColor, fontWeight: '800', fontSize: FontSize.sm }}
                    >
                        Create Room
                    </Text>
                </View>


                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                        marginTop: 30
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

                {/* Enter details */}
                <Text
                    style={{
                        color: Color.textColor,
                        fontWeight: '800',
                        fontSize: FontSize.md,
                        marginTop: 40,
                    }}
                >
                    Enter Room Details
                </Text>

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
                        Room ID
                    </Text>
                    <TextInput
                        style={{ color: Color.textColor, fontWeight: '800', fontSize: FontSize.xs }}
                        placeholder='Please specify others.'
                        placeholderTextColor={Color.textColor}
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
                        placeholder='Please specify others.'
                        placeholderTextColor={Color.textColor}
                        secureTextEntry={true}
                    />
                </View>

                

            </View>
            <View style={{
                position: "absolute",
                width: "100%",
                padding: 15,
                zIndex: 10,
                bottom: 80
            }}>
            <View style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
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
                    <GeneralButton onPress={handleClick} width={100} paddingVertical={10} title='Watch Ads' />
                </View>

                <View style={{ width: "100%", marginTop: 20 }}>
                    <GeneralButton onPress={handleClick} width={"100%"} paddingVertical={10} title='Enter' />
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
                <GeneralButton onPress={handleClick} width={68} paddingVertical={6} title='Home' />
                <GeneralButton onPress={handleClick} width={68} paddingVertical={6} title='Lobby' />
                <GeneralButton onPress={handleClick} width={68} paddingVertical={6} title='Watch' />
                <GeneralButton onPress={handleClick} width={68} paddingVertical={6} title='More' />
            </View>
        </SafeAreaView>
    );
}
