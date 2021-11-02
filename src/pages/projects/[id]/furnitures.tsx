import PageLayout from '@/components/PageLayout'
import { fetchProjectFurnitures } from '@/slices/project_furniture'
import { useAppDispatch } from '@/store/hook'

import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { fetchFurnitures } from '@/slices/funiture'
import ProjectFurnitureForm from '@/components/projects/ProjectFurnitureForm'
import { Container } from '@chakra-ui/react'

const ProjectFurniturePage = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    dispatch(fetchProjectFurnitures(Number(id)))
    dispatch(fetchFurnitures())
  }, [id])

  return (
    <PageLayout windowTitle="Contract">
      <Container maxW="container.xl">
        <ProjectFurnitureForm project_id={Number(id)} />
      </Container>
    </PageLayout>
  )
}
export default ProjectFurniturePage
