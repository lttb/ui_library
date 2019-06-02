import React, { Component } from 'react';
import styled, { css } from '@reshadow/styled';
import PropTypes from 'prop-types';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }
  componentDidMount() {
    this.runInterval();
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  runInterval = () => {
    this.interval = setInterval(this.step(this.props.images.length), +this.props.duration);
  };
  step = max => () => {
    const { current } = this.state;
    this.setState({
      current: current < max - 1 ? current + 1 : 0
    });
  };
  handler = indx => () => {
    this.setState({
      current: indx
    });
    clearInterval(this.interval);
    this.runInterval();
  };
  render() {
    const { images, horisontal, width, height } = this.props;
    const { current } = this.state;
    return (
      <WrapSlider width={width} height={height}>
        <UlSliders height={height}>
          {images.map((img, indx) => (
            <Li key={indx} active={current === indx}>
              <Img src={img.src} active={current === indx} />
              <Caption active={current === indx} horisontal={horisontal}>
                <H3>{img.caption}</H3>
                <H5>{img.text}</H5>
              </Caption>
            </Li>
          ))}
        </UlSliders>
        <Indicators>
          {images.map((_, indx) => (
            <Item onClick={this.handler(indx)} key={`indicators${indx}`} active={current === indx} />
          ))}
        </Indicators>
      </WrapSlider>
    );
  }
}
Slider.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      caption: PropTypes.string,
      text: PropTypes.string
    })
  ).isRequired,
  duration: PropTypes.PropTypes.number,
  horisontal: PropTypes.bool,
  width: PropTypes.PropTypes.string,
  height: PropTypes.PropTypes.string
};
Slider.defaultProps = {
  duration: 5000,
  width: '100%',
  height: '400px'
};
const WrapSlider = styled.div`
  height: ${props => props.height};
  position: relative;
  width: ${props => props.width};
`;
const UlSliders = styled.ul`
  background-color: #9e9e9e;
  margin: 0;
  height: ${props => props.height};
  padding-left: 0;
  list-style-type: none;
`;
const isActiveLi = props =>
  props.active &&
  css`
    opacity: 1;
    z-index: 2;
  `;
const Li = styled.li`
  opacity: 0;
  transform: translateX(0px) translateY(0px);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: inherit;
  overflow: hidden;
  list-style-type: none;
  ${isActiveLi};
`;
const Img = styled.img`
  opacity: 0;
  background-image: url(${props => props.src});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
  opacity: ${props => props.active && '1'};
  transition: opacity 0.2s linear;
`;
const isActiveCaption = props =>
  props.active &&
  css`
    opacity: 1;
    transform: translateX(0px) translateY(0px);
  `;
const Caption = styled.div`
  transform: translateY(-100px);
  transform: ${props => props.horisontal && 'translateX(-100px)'};
  color: #fff;
  position: absolute;
  top: 15%;
  left: 15%;
  width: 70%;
  opacity: 0;
  transition: all 0.3s linear;
  ${isActiveCaption};
`;
const Indicators = styled.ul`
  position: absolute;
  text-align: center;
  left: 0;
  right: 0;
  bottom: 10px;
  margin: 0;
  z-index: 9;
`;
const isActive = props =>
  props.active &&
  css`
    background-color: #4caf50;
    transform: scale(1.2);
  `;
const Item = styled.li`
  display: inline-block;
  position: relative;
  cursor: pointer;
  height: 16px;
  width: 16px;
  margin: 0 12px;
  background-color: #e0e0e0;
  transition: all 0.3s;
  border-radius: 50%;
  ${isActive};
`;
const H3 = styled.h3`
  font-size: 2.92rem;
  line-height: 110%;
  margin: 1.9466666667rem 0 1.168rem 0;
  font-weight: 400;
`;
const H5 = styled.h5`
  color: #eee;
  font-weight: 300;
`;
export default Slider;
