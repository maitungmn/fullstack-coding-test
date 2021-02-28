import React from "react";
import { Modal } from "@chakra-ui/modal";
import {
  Button, Image,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

const CreateBlogModal = (props) => {
  const { isOpen, onClose } = props;

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => onClose(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Blog</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateBlogModal;
