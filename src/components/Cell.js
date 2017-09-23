import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export default class Cell extends Component {
  constructor(props) {
    super(props);

    // const { id, currentPlayer, highlighted, owned } = this.props;

    this.state = {
      currentPlayer: this.props.currentPlayer,
      isHoverable: false,
      isHighlighted: false,
      owner: null,
      cornerMap: [['t', 'l'], ['t', 'r'], ['b', 'l'], ['b', 'r']]
    };

    // console.log(this.state);
  }

  componentWillReceiveProps(nextProps) {
    const { id, currentPlayer, highlighted, owner } = nextProps;

    this.setState({
      currentPlayer,
      isHighlighted: highlighted.includes(id),
      isHoverable: false,
      owner
    });
  }

  handleOnHover = e => {
    if (this.state.owner === null) {
      this.setState({
        isHoverable: e.type === 'mouseenter'
      });
    }
  };

  render() {
    return (
      <li
        className={cn(
          'cell',
          { 'cell-marked': this.state.owner !== null },
          { 'cell-highlight': this.state.isHighlighted },
          { 'cell-hoverable': this.state.isHoverable }
        )}
        id={this.props.id}
        onClick={this.props.handleOnClick}
        onMouseEnter={this.handleOnHover}
        onMouseLeave={this.handleOnHover}
      >
        {this.state.cornerMap.map((c, i) => (
          <span
            key={i}
            className={cn('corner', `corner--${c[0]}`, `corner--${c[1]}`)}
          />
        ))}
        {this.state.owner === 0 && (
          <span>
            <svg
              className="marker-oo"
              width="40px"
              height="40px"
              viewBox="0 0 40 40"
              version="1.1"
              strokeWidth="2"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <circle id="Oval-2" cx="20" cy="20" r="19" />
            </svg>
          </span>
        )}
        {this.state.owner === 1 && (
          <span>
            <svg
              className="marker-xx"
              width="38px"
              height="38px"
              viewBox="0 0 38 38"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <path
                d="M20,18.5857864 L3.20710678,1.79289322 L2.5,1.08578644 L1.08578644,2.5 L1.79289322,3.20710678 L18.5857864,20 L1.79289322,36.7928932 L1.08578644,37.5 L2.5,38.9142136 L3.20710678,38.2071068 L20,21.4142136 L36.2965162,37.7107298 L37.003623,38.4178366 L38.4178366,37.003623 L37.7107298,36.2965162 L21.4142136,20 L37.7107298,3.70348378 L38.4178366,2.996377 L37.003623,1.58216344 L36.2965162,2.28927022 L20,18.5857864 Z"
                id="Combined-Shape"
                transform="translate(-1.000000, -1.000000)"
              />
            </svg>
          </span>
        )}
      </li>
    );
  }
}

// const Cell = ({ id, handleOnClick, currPlayer, highlighted = [], owned = null }) => {
//   // @TODO cleanup
//
// };

Cell.propTypes = {
  id: PropTypes.number.isRequired,
  handleOnClick: PropTypes.func.isRequired,
  highlighted: PropTypes.array,
  owner: PropTypes.number,
  currentPlayer: PropTypes.oneOf([0, 1])
};

// export default Cell;

export const getCellMarker = int =>
  int !== null ? (int === 0 ? 'x' : 'o') : int;
