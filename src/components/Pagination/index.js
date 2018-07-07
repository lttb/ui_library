import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { Flat } from '../Button';
import Icon from '../Icon';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: this.props.currentPage
    };
  }
  decriment = () => {
    const { currentPage } = this.state;
    this.setState({
      currentPage: currentPage === 1 ? currentPage : currentPage - 1
    });
  };
  incriment = () => {
    const { currentPage } = this.state;
    const { maxPages } = this.props;
    this.setState({
      currentPage: currentPage === maxPages ? currentPage : currentPage + 1
    });
  };
  preparePaginat = () => {
    const { length, maxPages } = this.props;
    const { currentPage } = this.state;
    const startPoint = currentPage - Math.ceil(length / 2);
    const endPoint = maxPages - length;
    return [...Array(length)].map(
      (el, indx) => (startPoint <= 0 ? indx : startPoint + length >= maxPages ? endPoint + indx : startPoint + indx)
    );
  };
  render() {
    const { currentPage } = this.state;
    const { maxPages } = this.props;
    return (
      <div>
        <Wrap>
          <Li>
            <WrapIcon name="LeftArrow" onClick={this.decriment} disable={currentPage === 1} />
          </Li>
          {this.preparePaginat().map(el => (
            <Li key={el}>
              <WrapFlat
                currentPage={el + 1 === currentPage}
                handlerClick={() => this.setState({ currentPage: el + 1 })}
              >
                {el + 1}
              </WrapFlat>
            </Li>
          ))}
          <Li>
            <WrapIcon name="RightArrow" onClick={this.incriment} disable={currentPage === maxPages} />
          </Li>
        </Wrap>
      </div>
    );
  }
}
Pagination.propTypes = {
  currentPage: PropTypes.number,
  maxPages: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired
};
Pagination.defaultProps = {
  currentPage: 1
};
const Wrap = styled.ul`
  padding-left: 0;
  list-style-type: none;
  display: flex;
  align-items: center;
`;
const Li = styled.li`
  margin: 5px;
`;
const isCurrentPage = props =>
  props.currentPage &&
  css`
    background-color: #26a69a;
    color: #fff;
  `;
const WrapFlat = styled(Flat)`
  ${isCurrentPage};
  transition: background-color 0.2s linear;
  :not(:focus):hover {
    background-color: #44444440;
  }
`;
const isDisable = props =>
  props.disable &&
  css`
    color: #44400080;
    :hover {
      cursor: default;
    }
  `;
const WrapIcon = styled(Icon)`
  ${isDisable};
`;
export default Pagination;