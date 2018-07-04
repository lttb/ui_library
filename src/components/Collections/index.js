import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Collections = ({ data, active, header, color = 'inherit', handlerClick }) => (
  <Wrap color={color}>
    {header ? (
      <Li>
        <Head>{header}</Head>
      </Li>
    ) : null}
    {!active &&
      data.map((elem, indx) => (
        <Li key={indx} header={header}>
          {elem}
        </Li>
      ))}
    {active &&
      data.map((elem, indx) => (
        <LiA active={active} key={indx}>
          <Link href="#!" color={color} onClick={handlerClick}>
            {elem}
          </Link>
        </LiA>
      ))}
  </Wrap>
);
Collections.propTypes = {
  handlerClick: PropTypes.func,
  header: PropTypes.string,
  active: PropTypes.bool,
  color: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.any)
};
const Wrap = styled.ul`
  padding-left: 0;
  list-style-type: none;
  margin: 0.5rem 0 1rem 0;
  border: 1px solid #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  color: ${props => props.color};
`;
const Li = styled.li`
  display: flex;
  justify-content: space-between;
  background-color: inherit;
  line-height: 1.5rem;
  padding: ${props => (props.active ? '0' : props => (props.header ? '10px 20px 10px 30px' : '10px 20px'))};
  margin: 0;
  border-bottom: 1px solid #e0e0e0;
`;
const LiA = styled(Li)`
  width: 100%;
`;
const Link = styled.a`
  text-decoration: none;
  display: block;
  transition: 0.25s;
  padding: 10px 20px;
  color: ${props => props.color === 'inherit' && '#26a69a'};
  :hover {
    background-color: #ddd;
  }
`;
const Head = styled.h4`
  font-size: 2.28rem;
  line-height: 110%;
  margin: 1.52rem 0 0.912rem 0;
  font-weight: 400;
`;
export default Collections;
