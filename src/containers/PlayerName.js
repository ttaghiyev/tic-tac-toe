import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PlayerName extends Component {
  constructor() {
    super();

    this.state = {
      value: ''
    };
  }

  monitor = e => {
    this.setState({
      value: e.target.value
    });
  };

  update = () => {
    this.props.handleInputFocusOut(this.props.playerId, this.state.value);
  };

  render() {
    return (
      <input
        className="name-text-inpt"
        type="text"
        value={this.state.value}
        placeholder={this.props.placeholder}
        onChange={this.monitor}
        onBlur={this.update}
      />
    );
  }
}

PlayerName.propTypes = {
  playerId: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  handleInputFocusOut: PropTypes.func.isRequired
};
