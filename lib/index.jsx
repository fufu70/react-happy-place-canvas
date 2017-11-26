
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Config from './Config';
import drawCanvas from './DrawCanvas';

// A basic key to value object to help setup the config values
// from the given properties.
const propsToConfig = {
	friendCount: 'FRIEND_COUNT',
}

export default class ConfettiCanvas extends Component {

	static propTypes = {
		friendCount: PropTypes.number
	};

	handleCanvas = (el) => {

		if (el === null) {
			window.removeEventListener('resize', window.resizeConfetti, false);
			return;
		}

		drawCanvas(el, this.getConfig());
	}

	getConfig = () => {
		let configCopy = Object.assign({}, Config);

		for (var property in propsToConfig) {
			if (this.props[property] !== undefined) {
				configCopy[propsToConfig[property]] = this.props[property];
			}
		}

		return configCopy;
	}

	render() {

		return (
			<canvas id="happy-place" height="1" width="1" ref={ this.handleCanvas } />
		);
	}
}