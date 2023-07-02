import React from 'react';
import MaterialModal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import { ModalContainer } from './JediModal.styles';

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
  borderRadius: '8px',
};

const JediModal = ({ children, ...props }) => (
  <ModalContainer>
    <MaterialModal {...props}>
      <Box sx={{ ...defaultBoxStyles, ...(props.contentSx || {}) }}>
        {children}
      </Box>
    </MaterialModal>
  </ModalContainer>
);

export default JediModal;
