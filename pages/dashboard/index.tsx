import React from "react";
import { useRouter } from "next/router";

import { InferGetServerSidePropsType } from "next";
import { auth, blogsCol } from "@fb/launcher";
import { authValidator } from "utils/authValidator";
import { SimpleGrid, Image, Text, Button, Container, Flex, Center, Spacer } from "@chakra-ui/react";
import BlogModal from "../../components/dashboard/BlogModal";
import CreateBlogModal from "../../components/dashboard/CreateBlogModal";
import { useObserver } from "hooks/blogs/useObserver";
import { useFetchOnce } from "hooks/blogs/useFetchOnce";

export interface IBlog {
  title: string;
  imageUrl: string;
  content: string;
  _createBy: string;
  _createAt: Date;
}

export interface IBlogState extends IBlog {
  id: string;
}

export const getServerSideProps = authValidator;

const Dashboard = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const router = useRouter();

  const [openModalObj, setOpenModalObj] = React.useState(null);
  const [isOpenCreateBlog, setIsOpenCreateBlog] = React.useState(false);

  const [blogs, setBlogs] = React.useState<IBlogState[]>([]);

  useFetchOnce(setBlogs);
  useObserver(setBlogs);

  const signOut = async () => {
    await auth.signOut();
    router.push("/auth/sign-in");
  };

  const toggleModal = (isOpen: boolean, blogContent = null) => {
    setOpenModalObj(isOpen ? blogContent : null);
  };

  return (
    <Container maxW={"80vw"}>
      <Flex m={[0, 3]}>
        <Center w="200px">
          <Text>Welcome {props.user.infos.username || ""}!</Text>
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
              <Image objectFit="cover" src={i.imageUrl} alt="blog image" />
              <Text marginTop={"1rem"}>{i.title}</Text>
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
        />
      </Container>
    </Container>
  );
};

export default Dashboard;
