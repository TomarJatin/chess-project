import { View } from 'dripsy';
import { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import useChess from '../hooks/useChess';
import EmptyBoard from './EmptyBoard';
import Moves from './Moves';
import Toast from "react-native-simple-toast";
import Pieces from './Pieces';

const useRandomMove = (chess) => {
    while (!chess.isGameOver() && chess.turn() === 'b') {
        const moves = chess.moves();
        const move = moves[Math.floor(Math.random() * moves.length)];
        chess.move(move);
    }
};

const checkGameOver = (chess) => {
    if(chess.isGameOver()){
        if(chess.turn() === 'b' && chess.isCheckmate() ){
            Toast.show("You won", Toast.LONG);
        }
        else if(chess.isCheckmate()) {
            Toast.show("You lose", Toast.LONG);
        }
        else if(chess.isStalemate()){
            Toast.show("It's a stalemate", Toast.LONG);
        }
        else if(chess.isThreefoldRepetition()){
            Toast.show("It's a three fold repetition", Toast.LONG);
        }
        else if(chess.isDraw()){
            Toast.show("It's a Draw", Toast.LONG);
        }
    }
}

const Chess = () => {
    const { width } = useWindowDimensions();
    const chess = useChess();
    const [visibleMoves, setVisibleMoves] = useState([]);
    const boardSize = Math.min(width, 400);

    useRandomMove(chess);
    checkGameOver(chess);

    const handleSelectPiece = (square) => {
        const moves = chess.moves({ square: square, verbose: true });
        if(moves.length === 0 && chess.turn === 'w'){
            Toast.show("Your King is in the danger", Toast.SHORT);
        }
        setVisibleMoves(moves);
    };

    const handleSelectMove = (move) => {
        // Always promote to queen
        chess.move(move.promotion ? { ...move, promotion: 'q' } : move);
        setVisibleMoves([]);
    };


    return (
        <View sx={{ position: 'relative' }}>
            <EmptyBoard size={boardSize} />
            <Pieces board={chess.board()} onSelectPiece={handleSelectPiece} size={boardSize} />
            <Moves visibleMoves={visibleMoves} onSelectMove={handleSelectMove} size={boardSize} />
        </View>
    );
};

export default Chess;
