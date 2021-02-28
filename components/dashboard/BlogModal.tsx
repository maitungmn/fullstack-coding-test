import React from "react";
import { Modal } from "@chakra-ui/modal";
import {
  Image,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

const BlogModal = (props) => {
  const { openModalObj, onClose } = props;

  return (
    <>
      <Modal isOpen={!!openModalObj} onClose={() => onClose(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{openModalObj?.title || ""}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image objectFit="cover" src={openModalObj?.url || ""} alt={openModalObj?.alt || ""} />
            <Text>{openModalObj?.content || ""}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BlogModal;
