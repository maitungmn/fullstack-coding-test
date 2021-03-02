import React from "react";
import { useRouter } from "next/router";
import { InferGetServerSidePropsType } from "next";
import { SimpleGrid, Image, Text, Button, Container, Flex, Center, Spacer } from "@chakra-ui/react";

import { auth } from "@fb/launcher";
import { authValidator } from "utils/authValidator";
import { useObserver } from "hooks/blogs/useObserver";
import BlogModal from "components/blog/BlogModal";
import CreateBlogModal from "components/blog/CreateBlogModal";
import { useCheckAdmin } from "hooks/dashboard/useCheckAdmin";
import { useToken } from "hooks/useToken";
import { ENDPOINT_BLOG } from "constants/index";
import { buildClient } from "api/build-client";

export const getServerSideProps = authValidator;

const Dashboard = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const router = useRouter();

  const [openModalObj, setOpenModalObj] = React.useState(null);
  const [isOpenCreateBlog, setIsOpenCreateBlog] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);

  useCheckAdmin(props.user?.infos?.role)
  const [blogs] = useObserver();
  const [token] = useToken()

  const signOut = async () => {
    await auth.signOut();
    router.push("/auth/sign-in");
  };

  const toggleModal = (isOpen: boolean, blogContent = null) => {
    setOpenModalObj(isOpen ? blogContent : null);
  };

  const onDelete = async (event, blogID: string) => {
    event.stopPropagation()
    setIsDeleting(true)
    try {
      const axiosInstance = buildClient({ Authorization: `Bearer ${token}` })
      await axiosInstance.delete(`${ENDPOINT_BLOG}/${blogID}`)
      alert(`Blog with blog id: ${blogID} has been deleted!`)
    } catch (e) {
      alert(e)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Container maxW={"80vw"}>
      <Flex m={[0, 7]}>
        <Center w="400px">
          <Text>Welcome to Admin dashboard {props.user.infos.username || ""}!</Text>
        </Center>
        <Spacer />
        <Flex justify={"flex-end"}>
          <Button
            marginRight={"2rem"}
            onClick={() => {
              setIsOpenCreateBlog(true);
            }}
          >
            Create Blog
          </Button>
          <Button
            onClick={signOut}
          >
            Sign out
          </Button>
        </Flex>
      </Flex>

      <Container maxW={"100%"}>
        <SimpleGrid columns={3} spacing={10}>
          {blogs.map((i, index) => (
            <Flex
              key={index}
              direction="column"
              wrap={"wrap"}
              justify={"center"}
              textAlign="center"
              bg="#E2E8F0"
              borderRadius="3%"
              padding="2"
              onClick={() => toggleModal(true, i)}
            >
              <Image
                src={i.imageUrl} alt="blog image"
                objectFit="cover"
                maxH="260px"
              />
              <Text marginTop={"1rem"}>{i.title}</Text>

              <Flex marginTop={"1rem"}>
                <Button
                  marginRight="1rem"
                  colorScheme="red"
                  onClick={e => onDelete(e, i.id)}
                >Delete</Button>
                <Button
                  marginLeft="auto"
                  colorScheme="blue"
                >Update</Button>
              </Flex>
            </Flex>
          ))}
        </SimpleGrid>

        <BlogModal
          openModalObj={openModalObj}
          onClose={toggleModal}
        />

        <CreateBlogModal
          isOpen={isOpenCreateBlog}
          onClose={setIsOpenCreateBlog}
          user={props.user}
          token={token}
        />
      </Container>
    </Container>
  );
};

export default Dashboard;
