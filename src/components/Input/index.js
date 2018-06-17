import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }
  inputField = e => {
    this.setState({
      value: e.target.value
    });
  };
  render() {
    const { placeholder, ...props } = this.props;
    const { value } = this.state;
    return (
      <Wrapper>
        <InpWrap {...props} onChange={this.inputField} />
        <LabelWrap value={value}>{placeholder}</LabelWrap>
      </Wrapper>
    );
  }
}
Input.propTypes = {
  placeholder: PropTypes.string
};

const InpWrap = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #9e9e9e;
  border-radius: 0;
  outline: none;
  height: 3rem;
  width: 100%;
  font-size: 1rem;
  margin: 0 0 8px 0;
  padding: 0;
  box-shadow: none;
  box-sizing: content-box;
  transition: box-shadow 0.3s, border 0.3s;
  :disabled {
    border-bottom: 1px dotted rgba(0, 0, 0, 0.42);
  }
  :disabled + label {
    color: rgba(0, 0, 0, 0.42);
  }
  :focus + label {
    top: 0;
    font-size: 0.7rem;
    color: #26a69a;
  }
  :focus {
    border-bottom: 2px solid #26a69a;
  }
`;
const LabelWrap = styled.label`
  position: absolute;
  top: ${props => (props.value ? '0' : '1rem')};
  font-size: ${props => (props.value ? '0.7rem' : '1rem')};
  left: 0;
  color: #9e9e9e;
  transition: all 0.3s;
`;
const Wrapper = styled.div`
  position: relative;
`;

export default Input;