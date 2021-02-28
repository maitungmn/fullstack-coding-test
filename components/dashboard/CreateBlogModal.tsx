import React from "react";
import { Modal } from "@chakra-ui/modal";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { v4 as uuidv4 } from "uuid";
import { blogImageStorage, blogsCol } from "@fb/launcher";
import { IBlog } from "pages/dashboard";

const imgTypes = ["image/png", "image/jpeg"];
const maxImgSize = 5000000;

const CreateBlogModal = (props) => {
  const { isOpen, onClose, user } = props;

  const [title, setTitle] = React.useState<string>("");
  const [image, setImage] = React.useState<File>(null);
  const [content, setContent] = React.useState<string>("");
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsSuccess(false);
  }, []);

  const handleChange = (ct) => {
    setContent(ct);
  };

  const onImageChange = (e) => {
    const image = e.target.files[0];
    const isValidImageType = imgTypes.includes(image.type);
    if (!isValidImageType || image.size > maxImgSize) {
      e.target.value = null;
      alert("Invalid image!");
    }

    setImage(image);
  };

  const onTitleChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const onSubmitBlog = async () => {
    if (!title || !content || !image) {
      alert("Should provide all fields!");
    }
    setIsSaving(true);

    try {
      const imgSnapshot = await blogImageStorage.child(`${user?.uid || ""}_${uuidv4()}.jpg`).put(image);
      const imageUrl = await imgSnapshot.ref.getDownloadURL();

      await blogsCol.doc().set({
        title,
        content,
        imageUrl,
        _createBy: user.infos.username || "",
        _createAt: new Date(),
      } as IBlog);
      setIsSuccess(true);
    } catch (e) {
      console.error(e);
      alert(e);
    }

    setIsSaving(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => onClose(false)}>
        <ModalOverlay />
        <ModalContent maxW="40vw">
          <ModalHeader>Create Blog</ModalHeader>
          <ModalCloseButton />
          {isSuccess && (
            <Alert status="success">
              <AlertIcon />
              Data uploaded to the server. Fire on!
            </Alert>
          )}
          <ModalBody>
            <Flex direction="column">
              <Box marginBottom="1rem">
                <label htmlFor="blog-title">Input title</label>
                <Input
                  id="blog-title"
                  type="text"
                  onChange={onTitleChange} />
              </Box>

              <Box marginBottom="1rem">
                <label htmlFor="blog-image">Select an image:</label>
                <Input
                  id="blog-image"
                  type="file"
                  accept={imgTypes.join(", ")}
                  onChange={onImageChange} />
              </Box>

              <Box>
                <label>Input content:</label>
                <SunEditor height="300" onChange={handleChange} />
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              mr={3}
              isLoading={isSaving}
              onClick={() => onClose(false)}
            >
              Close
            </Button>
            {!isSuccess && (
              <Button
                colorScheme="blue"
                isLoading={isSaving}
                onClick={onSubmitBlog}
              >Create</Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateBlogModal;
