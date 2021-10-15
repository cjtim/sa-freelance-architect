import NavBar from '@/components/NavBar'
import PageLayout from '@/components/PageLayout'
import BaseTable from '@/components/Table/BaseTable'
import { Project } from '@/pages/api/entity/project'
import { fetchProjects } from '@/slices/projects'
import { useAppSelector, useAppDispatch } from '@/store/hook'
import { Container, Flex, Heading, Button, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Column } from 'react-table'

const ProjectList: React.FC = () => {
  const { projects } = useAppSelector((state) => state.projects)
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  const columns: Column<Project>[] = [
    {
      Header: 'Name',
      accessor: 'name',
      Cell: ({ value, row }) => (
        <Link as={NextLink} href={`/projects/${row.original.project_id}`}>
          <a>{value}</a>
        </Link>
      ),
    },
    {
      Header: 'Customer name',
      accessor: 'customer',
      Cell: ({ value }) => value?.name,
    },
  ]

  return (
    <PageLayout windowTitle="Projects table">
      <NavBar />
      <Container maxW="container.lg">
        <Flex py={4}>
          <Heading>Projects</Heading>
          <Button
            marginLeft="auto"
            colorScheme="green"
            onClick={() => router.push('/projects/create')}
          >
            Create
          </Button>
        </Flex>
        <BaseTable data={projects} columns={columns} my={4} />
      </Container>
    </PageLayout>
  )
}

export default ProjectList
