import NavBar from '@/components/NavBar'
import PageLayout from '@/components/PageLayout'
import { Center, Container, Heading } from '@chakra-ui/react'
import React from 'react'

export default function Home() {
  return (
    <PageLayout windowTitle="Files table">
      <NavBar />
      <Container maxW="container.lg">
        <Center p={4}>
          <Heading>Home</Heading>
        </Center>
      </Container>
    </PageLayout>
  )
}
