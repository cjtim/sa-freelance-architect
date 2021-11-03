import NavBar from '@/components/NavBar'
import PageLayout from '@/components/PageLayout'
import { Project } from '@/pages/api/entity'
import { fetchCustomers } from '@/slices/customer'
import { createProject } from '@/slices/projects'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { Container, Heading } from '@chakra-ui/react'
import router from 'next/router'
import React, { useEffect } from 'react'
import ProjectForm from '@/components/projects/ProjectForm'

const ProjectCreate = () => {
  const dispatch = useAppDispatch()
  const { customers } = useAppSelector((state) => state.customers)

  const handleSubmit = async (values: Project) => {
    if (values.name) {
      await dispatch(createProject(values))
      router.push('/projects')
    }
  }
  useEffect(() => {
    dispatch(fetchCustomers())
  }, [])

  if (typeof window !== 'undefined') {
    return (
      <PageLayout windowTitle="Project Create">
        <NavBar />
        <Container maxW="container.xl">
          <Heading>Project create</Heading>
          <ProjectForm customers={customers} onSubmit={handleSubmit} />
        </Container>
      </PageLayout>
    )
  }
  return null
}

export default ProjectCreate
