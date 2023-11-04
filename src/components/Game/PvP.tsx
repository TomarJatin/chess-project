import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useContext } from 'react';
import Chess from '../../components/ChessBoard';
import { Color } from '../../../GlobalStyle';
import { GameContext } from '../../contexts';

const PvP = () => {
    const { selectedMode, timer } = useContext(GameContext);

    return (
        <SafeAreaView style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
            <View
                style={{
                    display: 'flex',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: Color.backgroundColor,
                }}
            >
                <Chess />
            </View>
        </SafeAreaView>
    );
};

export default PvP;
