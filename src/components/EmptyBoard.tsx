import { View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

const BOARD_SIZE = 8;

const EmptyBoard = ({ size }) => {
    return (
        <View
            style={{
                width: size,
                height: size,
                backgroundColor: '#ccc',
                // borderRadius: '1%',
                overflow: 'hidden',
            }}
        >
            <FlatGrid
                staticDimension={size}
                itemDimension={size / BOARD_SIZE}
                fixed
                spacing={0}
                data={[...Array(BOARD_SIZE * BOARD_SIZE).keys()]}
                renderItem={({ item: index }) => {
                    const col = Math.floor(index / BOARD_SIZE);
                    const row = index % BOARD_SIZE;
                    const color = (row + col) % 2 === 0 ? '#B7C0D8' : '#E8EDF9';
                    return (
                        <View
                            key={index.toString()}
                            style={{
                                width: size / BOARD_SIZE,
                                height: size / BOARD_SIZE,
                                backgroundColor: color,
                            }}
                        />
                    );
                }}
            />
        </View>
    );
};

export default EmptyBoard;
