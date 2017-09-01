import React from 'react';
import { View , Image } from 'react-native';
import PropTypes from 'prop-types';

import PieceImages from '../images/pieces';

export default class Cell extends React.Component {

	static propTypes = {
		size: PropTypes.number.isRequired,
		rowIndex: PropTypes.number.isRequired,
		columnIndex: PropTypes.number.isRequired,
		piece: PropTypes.string,
		selected: PropTypes.bool,
		canMoveHere: PropTypes.bool,
	};

	render() {

		const {
			size,
			rowIndex,
			columnIndex,
			piece,
			selected,
			canMoveHere,
		} = this.props;

		const isBlack = (rowIndex + columnIndex) % 2 === 0;
		let backgroundColor = isBlack ? '#F0D9B5' : '#B58863';

		if (selected) {
			backgroundColor = '#48d1cc';
		} else if (canMoveHere) {
			backgroundColor = '#00ffff';
		}

		let pieceView = null;
		if(piece) {
			pieceView = <Image source={PieceImages[piece]} style={{ width:size , height:size }} />
		}

		return (
			<View style={{ backgroundColor, width: size, height: size }}>
				{ pieceView }
			</View>
		);
	}
}