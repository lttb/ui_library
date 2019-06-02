import React from 'react';
import { storiesOf } from '@storybook/react';
import GRID from './index';
import styled from '@reshadow/styled';

const Div = ({ ...props }) => <Wrap {...props} />;
const Wrap = styled.div`
  background-color: green;
  border: 1px solid grey;
  box-sizing: border-box;
  height: 250px;
  grid-row: ${props => props.row && props.row};
  grid-column: ${props => props.col && props.col};
`;

storiesOf('GRID', module)
  .add('GRID 4 height=400px , div inside height:250px', () => (
    <GRID col={4} height={'400px'}>
      {[...Array(4)].map((el, indx) => <Div key={indx} />)}
      <Div col={'2/4'} />
    </GRID>
  ))
  .add('GRID 12', () => <GRID col={12}>{[...Array(12)].map((el, indx) => <Div key={indx} />)}</GRID>)
  .add('GRID 12 element biggest col row', () => (
    <GRID col={12}>{[...Array(18)].map((el, indx) => <Div key={indx} />)}</GRID>
  ))
  .add('GRID 24 gap 0.5rem', () => (
    <GRID col={24} gap={'0.5rem'}>
      {[...Array(24)].map((el, indx) => <Div key={indx} />)}
    </GRID>
  ));
