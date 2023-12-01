import React, { useContext } from 'react';
import { ModalsDispatchContext, ModalsStateContext } from './modalContext';

export default function useModals() {
  const { open, close } = useContext(ModalsDispatchContext);
  const modalState = useContext(ModalsStateContext);

  const openModal = (Component, props) => {
    open(Component, props);
  };

  const closeModal = (Component) => {
    close(Component);
  };

  return {
    openModal,
    closeModal,
    modalState,
  };
}