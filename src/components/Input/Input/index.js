import React, { Component } from 'react';
import styled, { css } from '@reshadow/styled';
import PropTypes from 'prop-types';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      coincidence: '',
      correct: true
    };
    this.input = React.createRef();
  }

  changeValue = e => {
    const nextValue = e.target.value;
    const { value } = this.state;
    const { counterMax, regexp } = this.props;
    const fieldName = e.currentTarget.dataset.fieldName;
    this.setState(
      {
        value: !counterMax || nextValue.length <= counterMax ? nextValue : value,
        correct: !regexp ? true : nextValue !== '' ? regexp.test(nextValue) : true
      },
      () => {
        if (this.props.handler) {
          this.props.handler({
            value: this.state.value,
            correct: this.state.correct,
            fieldName
          });
        }
        this.setState({
          coincidence:
            this.state.value &&
            this.props.data.filter(elem => elem.toLowerCase().indexOf(this.state.value.toLowerCase()) !== -1)
        });
      }
    );
  };

  setValue = elem => () => this.setState({ value: elem, coincidence: [] });

  setFocus = () => this.input.current.focus();

  render() {
    const { placeholder, regexp, counterMax, ...props } = this.props;
    const { value, coincidence, correct } = this.state;
    const active = coincidence.length > 0;
    return (
      <Wrapper>
        <InpWrap {...props} onChange={this.changeValue} value={value} right={correct} ref={this.input} />
        <LabelWrap value={value} onClick={this.setFocus}>
          {placeholder}
        </LabelWrap>
        {regexp !== '' && value !== '' ? <Span right={correct}>{correct ? 'right' : 'error'}</Span> : null}
        {
          <UlAuto active={active}>
            {active &&
              coincidence.map((elem, indx) => (
                <Li key={indx} onClick={this.setValue(elem)}>
                  {elem}
                </Li>
              ))}
          </UlAuto>
        }
        {counterMax && <CharacterCounter>{`${value.length}/${counterMax}`}</CharacterCounter>}
      </Wrapper>
    );
  }
}

Input.propTypes = {
  placeholder: PropTypes.string,
  regexp: (props, propName, componentName) => {
    if (props[propName] && !/.+/.test(props[propName])) {
      return new Error(`Invalid prop ${propName} supplied to ${componentName} Validation failed.`);
    }
  },
  data: PropTypes.arrayOf(PropTypes.string),
  counterMax: PropTypes.number,
  handler: PropTypes.func
};

Input.defaultProps = {
  regexp: '',
  data: []
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
    border-bottom: 1px solid ${props => (props.right ? '#26a69a' : '#f44336')};
    box-shadow: 0 1px 0 0 ${props => (props.right ? '#26a69a' : '#f44336')};
  }
  :focus ~ span {
    font-size: 0.8rem;
    transition: font-size 0.3s;
  }
  :not(:focus) ~ span {
    font-size: 0.5rem;
    bottom: -1px;
    transition: font-size 0.3s, bottom 0.3s;
  }
`;

const LabelWrap = styled.label`
  position: absolute;
  top: ${props => (props.value ? '0' : '1rem')};
  font-size: ${props => (props.value ? '0.7rem' : '1rem')};
  left: 0;
  color: #9e9e9e;
  transition: all 0.3s;
  cursor: text;
`;

const Wrapper = styled.div`
  position: relative;
`;

const isError = props =>
  !props.right
    ? css`
        color: #f44336;
      `
    : css`
        color: #26a69a;
      `;
const Span = styled.span`
  opacity: 1;
  position: absolute;
  bottom: -10px;
  left: 0;
  ${isError};
`;

const isActive = props =>
  props.active &&
  css`
    box-shadow: 1px 2px 3px 2px #00000060;
    opacity: 1;
    transform: scaleX(1) scaleY(1);
  `;

const UlAuto = styled.ul`
  position: absolute;
  margin: 0;
  padding: 0;
  list-style: none;
  top: 3rem;
  left: 0;
  display: block;
  width: 100%;
  box-sizing: border-box;
  transform-origin: 0px 0px 0px;
  opacity: 0;
  transform: scaleX(0.5) scaleY(0);
  transition: all 0.2s linear;
  ${isActive};
`;

const Li = styled.li`
  padding: 5px;
  outline: 1px solid #80808060;
  :hover {
    background-color: #80808060;
    cursor: pointer;
  }
`;

const CharacterCounter = styled.span`
  position: absolute;
  bottom: -10px;
  right: 0;
`;

export default Input;
