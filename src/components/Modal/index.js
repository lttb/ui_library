import React from 'react';
import styled, { css, keyframes } from '@reshadow/styled';
import PropTypes from 'prop-types';

import { Flat } from '../Button';

const Modal = ({ isOpen, handlerClick, ...props }) => (
  <WrapperModal isOpen={isOpen}>
    <ModalContent {...props}>
      <h3>{props.modal.header}</h3>
      <p>{props.modal.content}</p>
    </ModalContent>
    <ModalFooter>
      <Flat handlerClick={handlerClick} danger>
        Disagree
      </Flat>
      <Flat handlerClick={handlerClick}>Agree</Flat>
    </ModalFooter>
  </WrapperModal>
);
Modal.propTypes = {
  isOpen: PropTypes.bool,
  handlerClick: PropTypes.func,
  modal: PropTypes.shape({
    header: PropTypes.string,
    content: PropTypes.string
  })
};
const animIsopen = keyframes`
    from{
      opacity: 0;
      transform: scaleX(0) scaleY(0);
    }
    to {
      opacity: 1;
      transform: scaleX(1) scaleY(1);
    }
`;
const isOpen = props =>
  props.isOpen &&
  css`
    z-index: 1003;
    display: block;
    opacity: 1;
    top: 10%;
    transform: scaleX(1) scaleY(1);
    box-sizing: border-box;
    box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12),
      0 11px 15px -7px rgba(0, 0, 0, 0.2);
    animation: ${animIsopen} 0.3s;
  `;
const WrapperModal = styled.div`
  display: none;
  transform: scaleX(0) scaleY(0);
  position: fixed;
  left: 0;
  right: 0;
  background-color: #fafafa;
  padding: 0;
  max-height: 70%;
  width: 55%;
  margin: auto;
  overflow-y: auto;
  border-radius: 2px;
  @media only screen and (max-width: 992px) {
    width: 80%;
  }
  h1,
  h2,
  h3,
  h4 {
    margin-top: 0;
  }
  ${isOpen};
`;
const ModalContent = styled.div`
  padding: 24px;
  box-sizing: border-box;
`;
const ModalFooter = styled.div`
  border-radius: 0 0 2px 2px;
  background-color: #fafafa;
  padding: 4px 6px;
  height: 56px;
  width: 100%;
  text-align: right;
  box-sizing: border-box;
`;

export default Modal;
