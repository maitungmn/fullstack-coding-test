import React from "react";
import { Modal } from "@chakra-ui/modal";
import {
  Flex,
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
            <Flex direction="column">
              <Image
                src={openModalObj?.imageUrl || ""} alt={openModalObj?.alt || ""}
                objectFit="cover"
                marginBottom="1rem"
              />
              <Text dangerouslySetInnerHTML={{ __html: openModalObj?.content || "" }} />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BlogModal;
