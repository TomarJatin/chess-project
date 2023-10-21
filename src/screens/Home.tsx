import { Pressable, SafeAreaView, Text } from 'dripsy';
import { useWindowDimensions } from 'react-native';

import EmptyBoard from '../components/EmptyBoard';

const Home = ({ navigation }) => {
    const { width } = useWindowDimensions();
    const boardSize = Math.min(width, 400);
    return (
        <SafeAreaView sx={{ display: 'flex', flex: 1, alignItems: 'center',flexDirection: 'column', justifyContent: 'center' }}>
            <Pressable
                sx={{ padding: 2, borderRadius: 4 }}
                onPress={() => navigation.navigate('Game')}
            >
                <Text
                    sx={{
                        color: 'white',
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                    }}
                >
                    Play Now
                </Text>
            </Pressable>
        </SafeAreaView>
    );
};

export default Home;
