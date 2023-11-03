import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from 'dripsy';
import { Dimensions } from 'react-native';
import { Color } from '../../GlobalStyle';

export default function InsideLobby() {
    return (
        <SafeAreaView>
            <View style={{
                minHeight: Dimensions.get('window').height,
                backgroundColor: Color.backgroundColor,
                padding: 15
            }}>
                <Text>Inside Lobby</Text>
            </View>
        </SafeAreaView>
    );
}
