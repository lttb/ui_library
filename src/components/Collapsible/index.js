import React, { Component } from 'react';
import styled, { css } from '@reshadow/styled';
import PropTypes from 'prop-types';

import Li from './Li';

class Collapsible extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: -1,
      numberClick: -1
    };
  }

  handler = indx => () =>
    this.setState({
      numberClick: indx,
      isOpen: this.state.isOpen === indx ? -1 : indx
    });

  render() {
    const { data, ...props } = this.props;
    const { numberClick, isOpen } = this.state;
    return (
      <WrapperCollapsible {...props}>
        {data.map((elem, indx) => (
          <Li
            key={indx}
            data={elem}
            isOpen={numberClick === indx ? (isOpen === indx ? true : false) : false}
            click={this.handler(indx)}
            {...props}
          />
        ))}
      </WrapperCollapsible>
    );
  }
}
Collapsible.propTypes = {
  /** type of collapsible - popout */
  popout: PropTypes.bool,
  /** array of objects */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      /** header */
      header: PropTypes.string,
      /** content */
      content: PropTypes.string
    })
  )
};
const isBorder = props =>
  !props.popout &&
  css`
    border-top: 1px solid #ddd;
    border-right: 1px solid #ddd;
    border-left: 1px solid #ddd;
  `;
const WrapperCollapsible = styled.ul`
  ${isBorder};
  margin: 0.5rem 0 1rem 0;
  padding-left: 0;
  list-style-type: none;
`;

export default Collapsible;
