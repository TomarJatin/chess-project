import { SafeAreaView, View } from 'dripsy';
import React from 'react';

import Chess from '../components/ChessBoard';

const PvAi = () => {
    return (
        <SafeAreaView sx={{ display: 'flex', flex: 1, alignItems: 'center' }}>
            <View sx={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Chess />
            </View>
        </SafeAreaView>
    );
};

export default PvAi;
