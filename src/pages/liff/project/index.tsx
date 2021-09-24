import NavBar from '@/components/NavBar'
import PageLayout from '@/components/PageLayout'
import BaseTable from '@/components/Table/BaseTable'
import { Projects } from '@/pages/api/entity/projects'
import { fetchProject } from '@/slices/projects'
import { useAppSelector, useAppDispatch } from '@/store/hook'
import { Container } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Column } from 'react-table'

const ProjectList: React.FC = () => {
  const { projects } = useAppSelector((state) => state.projects)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchProject())
  }, [dispatch])

  const columns: Column<Projects>[] = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
  ]

  return (
    <PageLayout windowTitle="Projects table">
      <NavBar />
      <Container maxW="container.lg">
        <BaseTable data={projects} columns={columns} my={4} />
      </Container>
    </PageLayout>
  )
}

export default ProjectList
