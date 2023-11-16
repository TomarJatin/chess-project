import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput } from 'dripsy';
import { Dimensions, TouchableOpacity } from 'react-native';
import { Color, FontSize } from '../../GlobalStyle';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import GeneralButton from '../components/General/Button';
import BottomNav from '../components/General/BottomNav';
import ImgButton from '../components/General/ImgButton';

export default function More({ navigation }) {
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
                        More
                    </Text>
                </View>

                {/* Options */}
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'column',
                        gap: 28,
                        marginTop: 40,
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 15,
                            paddingVertical: 8,
                        }}
                    >
                        <ImgButton
                            children={<Ionicons name='person' size={20} color='white' />}
                            width={34}
                            paddingHorizontal={7}
                            paddingVertical={6}
                            onPress={() => {}}
                            borderRadius={17}
                        />
                        <Text
                            style={{
                                color: Color.textColor,
                                fontSize: FontSize.xs13,
                                fontWeight: '800',
                            }}
                        >
                            Profile
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 15,
                            paddingVertical: 8,
                        }}
                    >
                        <ImgButton
                            children={<FontAwesome5 name="swatchbook" size={20} color='white' />}
                            width={34}
                            paddingHorizontal={7}
                            paddingVertical={6}
                            onPress={() => {}}
                            borderRadius={17}
                        />
                        <Text
                            style={{
                                color: Color.textColor,
                                fontSize: FontSize.xs13,
                                fontWeight: '800',
                            }}
                        >
                            Theme & Personalize
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 15,
                            paddingVertical: 8,
                        }}
                    >
                        <ImgButton
                            children={<FontAwesome name="shopping-cart" size={20} color='white' />}
                            width={34}
                            paddingHorizontal={7}
                            paddingVertical={6}
                            onPress={() => {}}
                            borderRadius={17}
                        />
                        <Text
                            style={{
                                color: Color.textColor,
                                fontSize: FontSize.xs13,
                                fontWeight: '800',
                            }}
                        >
                            Shop
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 15,
                            paddingVertical: 8,
                        }}
                    >
                        <ImgButton
                            children={<FontAwesome name="volume-up" size={20} color='white' />}
                            width={34}
                            paddingHorizontal={7}
                            paddingVertical={6}
                            onPress={() => {}}
                            borderRadius={17}
                        />
                        <Text
                            style={{
                                color: Color.textColor,
                                fontSize: FontSize.xs13,
                                fontWeight: '800',
                            }}
                        >
                            Sound
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 15,
                            paddingVertical: 8,
                        }}
                    >
                        <ImgButton
                            children={<FontAwesome name="exclamation-circle" size={20} color='white' />}
                            width={34}
                            paddingHorizontal={7}
                            paddingVertical={6}
                            onPress={() => {}}
                            borderRadius={17}
                        />
                        <Text
                            style={{
                                color: Color.textColor,
                                fontSize: FontSize.xs13,
                                fontWeight: '800',
                            }}
                        >
                            Help
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 15,
                            paddingVertical: 8,
                        }}
                    >
                        <ImgButton
                            children={<MaterialIcons name="logout" size={20} color='white' />}
                            width={34}
                            paddingHorizontal={7}
                            paddingVertical={6}
                            onPress={() => {}}
                            borderRadius={17}
                        />
                        <Text
                            style={{
                                color: Color.textColor,
                                fontSize: FontSize.xs13,
                                fontWeight: '800',
                            }}
                        >
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <BottomNav />
        </SafeAreaView>
    );
}
