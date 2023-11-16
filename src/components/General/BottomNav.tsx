import { View } from 'react-native';
import GeneralButton from './Button';
import { useNavigation } from '@react-navigation/native';

export default function BottomNav() {
    const navigation = useNavigation();

    return (
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
            <GeneralButton
                onPress={() => navigation.navigate('Home')}
                width={68}
                paddingVertical={6}
                title='Home'
                borderRadius={14}
            />
            <GeneralButton
                onPress={() => navigation.navigate('Lobby')}
                width={68}
                paddingVertical={6}
                title='Lobby'
                borderRadius={14}
            />
            <GeneralButton
                onPress={() => navigation.navigate('Stats')}
                width={68}
                paddingVertical={6}
                title='Stats'
                borderRadius={14}
            />
            <GeneralButton
                onPress={() => navigation.navigate('More')}
                width={68}
                paddingVertical={6}
                title='More'
                borderRadius={14}
            />
        </View>
    );
}
