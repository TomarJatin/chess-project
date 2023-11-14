import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useContext } from 'react';
import Chess from '../components/ChessBoard';
import { Color } from '../../GlobalStyle';
import { GameContext } from '../contexts';
import PvP from '../components/Game/PvP';
import Online from '../components/Game/Online';
import Ai from '../components/Game/Ai';

const Game = () => {
    const { selectedMode, timer } = useContext(GameContext);

    if(selectedMode === "PvP"){
        return <PvP />
    }
    else if(selectedMode === "Online"){
        return <Online />
    }
    else{
        return <Ai />
    }
};

export default Game;
