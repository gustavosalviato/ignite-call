import { Avatar, Heading, Text } from "@ignite-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { prisma } from "../../../libs/prisma";
import { ScheduleForm } from "./ScheduleForm";
import { Container, ProfileHeader } from "./styles";

interface Schedule {
  user: {
    name: string,
    bio: string,
    avatarUrl: string
  }
}

export default function Schedule({ user }: Schedule) {
  return (
    <>
      <NextSeo title={`Agendar com ${user.name}| Ignite Call`} />
      <Container>
        <ProfileHeader>
          <Avatar
            src={user.avatarUrl}
          />
          <Heading>{user.name}</Heading>
          <Text>{user.bio}</Text>
        </ProfileHeader>
        <ScheduleForm />
      </Container>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username)

  if (!username) {
    return {
      notFound: true
    }
  }


  const user = await prisma.user.findUnique({
    where: {
      username
    }
  })

  return {
    props: {
      user: {
        name: user?.name,
        bio: user?.bio,
        avatarUrl: user?.avatar_url
      }
    },
  }
}

