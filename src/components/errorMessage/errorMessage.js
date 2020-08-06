import React, {Component} from 'react';

import './errorMessage.css';
import img from './error.jpg';

export default class ErrorMessage extends Component {
	render() {
		return (
			<>
				<img src={img} alt='error'></img>
				<span>Something goes wrong</span>
			</>
		)
	}
}