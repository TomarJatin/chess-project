import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions, Pressable, Text, View, useWindowDimensions, StatusBar } from 'react-native';
import { Image } from 'expo-image';
import EmptyBoard from '../components/EmptyBoard';
import { Color } from '../../GlobalStyle';

const Home = ({ navigation }) => {
    const { width } = useWindowDimensions();

    return (
        <SafeAreaView
            style={{
                width: '100%',
                flex: 1,
            }}
        >
            <StatusBar backgroundColor={'#181818'} barStyle={'light-content'} />
            <View
                style={{
                    minHeight: Dimensions.get('window').height,
                    backgroundColor: Color.backgroundColor,
                }}
            >
                {/* Coins and Watch Ads */}

                <View>
                    <View>
                        <Image
                            style={{
                                width: 50,
                                height: 50,
                            }}
                            contentFit='contain'
                            source={require('../../assets/coins-in-hand.png')}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Home;
