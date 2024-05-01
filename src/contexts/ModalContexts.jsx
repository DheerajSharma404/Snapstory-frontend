/* eslint-disable react/prop-types */
import React from "react";

export const ModalContext = React.createContext();

const ModalContextProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [ModalContent, setModalContent] = React.useState(null);

  const toggleModal = (content) => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      document.body.classList.add("noScroll");
    } else {
      document.body.classList.remove("noScroll");
    }
    setModalContent(content);
  };

  const changeModalContent = (content) => {
    setModalContent(content);
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        toggleModal,
        ModalContent,
        changeModalContent,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
