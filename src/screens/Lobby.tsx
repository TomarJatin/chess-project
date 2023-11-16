import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput } from 'dripsy';
import { Dimensions } from 'react-native';
import { Color, FontSize } from '../../GlobalStyle';
import GeneralButton from '../components/General/Button';
import BottomNav from '../components/General/BottomNav';

export default function Lobby({ navigation }) {
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
                        Lobby
                    </Text>
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
                    />
                </View>

                <View style={{ width: '100%', marginTop: 100 }}>
                    <GeneralButton
                        onPress={handleClick}
                        width={'100%'}
                        paddingVertical={10}
                        title='Enter'
                        borderRadius={14}
                    />
                </View>
            </View>
            <BottomNav />
        </SafeAreaView>
    );
}
