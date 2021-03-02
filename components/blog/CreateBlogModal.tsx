import React from "react";
import { Modal } from "@chakra-ui/modal";
import { v4 as uuidv4 } from "uuid";
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

import { blogImageStorage } from "@fb/launcher";
import { ENDPOINT_BLOG } from "constants/index";
import { buildClient } from "api/build-client";
import { useCheckCreateUpdate } from "hooks/blogs/useCheckCreateUpdate";

const imgTypes = ["image/png", "image/jpeg"];
const maxImgSize = 5000000;

const CreateBlogModal = (props) => {
  const { isOpen, onClose, user, updateContents } = props;

  const [title, setTitle] = React.useState<string>("");
  const [image, setImage] = React.useState<File>(null);
  const [content, setContent] = React.useState<string>("");
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);

  const [isCreate] = useCheckCreateUpdate(updateContents)

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

      const axiosInstance = buildClient({ Authorization: `Bearer ${props.token}` })
      await axiosInstance.post(ENDPOINT_BLOG, {
        title,
        content,
        imageUrl,
      })
      setIsSuccess(true);
    } catch (e) {
      console.error(e);
      alert(e);
    }

    setIsSaving(false);
  };

  const onUpdateBlog = async () => {
    if (!title || !content) {
      alert("Should provide all fields!");
    }
    setIsSaving(true);

    if (!updateContents?.id) {
      onClose(false)
      alert("Something went wrong!")
    }
    try {
      const axiosInstance = buildClient({ Authorization: `Bearer ${props.token}` })
      await axiosInstance.put(`${ENDPOINT_BLOG}/${updateContents?.id}`, {
        title,
        imageURL: updateContents?.imageURL || "",
        content,
      })
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
          <ModalHeader>{isCreate ? "Create Blog" : `Update Blog ${updateContents.title || ""}`}</ModalHeader>
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
                  defaultValue={updateContents?.title || ""}
                  onChange={onTitleChange} />
              </Box>

              <Box marginBottom="1rem">
                {isCreate ? (
                  <>
                    <label htmlFor="blog-image">Select an image:</label>
                    <Input
                      id="blog-image"
                      type="file"
                      accept={imgTypes.join(", ")}
                      onChange={onImageChange} />
                  </>
                ) : (
                    <Input
                      type="text"
                      disabled
                      defaultValue={updateContents?.imageUrl || ""}
                    />
                  )}

              </Box>

              <Box>
                <label>Input content:</label>
                <SunEditor
                  defaultValue={isCreate && updateContents?.content ? "" : updateContents?.content}
                  height="300"
                  onChange={handleChange}
                />
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
            {!isSuccess && isCreate && (
              <Button
                colorScheme="blue"
                isLoading={isSaving}
                onClick={onSubmitBlog}
              >Create</Button>
            )}
            {!isSuccess && !isCreate && (
              <Button
                colorScheme="blue"
                isLoading={isSaving}
                onClick={onUpdateBlog}
              >Update</Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateBlogModal;
