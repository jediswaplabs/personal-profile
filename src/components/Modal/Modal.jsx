import React from 'react';
// eslint-disable-next-line import/no-named-default
import { default as MaterialModal } from '@mui/material/Modal';
import Box from '@mui/material/Box';

import { ModalContainer } from './Modal.styles';

const defaultBoxStyles = {
  width: '100%',
  maxWidth: '400px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#141451',
  padding: '2rem',
  border: '1px solid #fff',
  // background: 'linear-gradient(to top right,#50d5ff,#ef35ff)',
  // padding: '2px',
  borderRadius: '8px',
};

const Modal = ({ children, ...props }) => (
  <ModalContainer>
    <MaterialModal {...props}>
      <Box sx={{ ...defaultBoxStyles, ...(props.contentSx || {}) }}>
        {children}
      </Box>
    </MaterialModal>
  </ModalContainer>
);

export default Modal;
