import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';

export default class Message extends Component {
  constructor(props) {
    super(props);

    this.msgElem = null;
    this.animTimeline = new TimelineLite();

    this.state = {
      message: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text !== '' && nextProps.text !== this.state.message) {
      this.setState({
        message: nextProps.text
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.message !== '' && this.state.message !== prevState.message) {
      this.animTimeline.restart();
    }
  }

  componentDidMount() {
    this.msgElem = document.getElementsByClassName('game-message')[0];
    this.animTimeline
      .to(this.msgElem, 0, { opacity: 0, x: '-50%', y: 5 })
      .to(this.msgElem, 0.25, { opacity: 1, x: '-50%', y: 0 })
      .to(
        this.msgElem,
        0.25,
        { opacity: 0, x: '-50%', y: 5, clearProps: 'all' },
        '+=.75'
      )
      .eventCallback('onComplete', () => this.setState({ message: '' }));
  }

  render() {
    return <div className="game-message">{this.props.text}</div>;
    // return <div className="game-message">{this.state.message}</div>;
  }
}

Message.propTypes = {
  text: PropTypes.string
};
