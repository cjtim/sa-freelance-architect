import NavBar from '@/components/NavBar'
import PageLayout from '@/components/PageLayout'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { Container, Heading, Divider } from '@chakra-ui/react'
import { fetchProject } from '@/slices/projects'
import FileTable from './components/FileTable'

const ProjectDetails = () => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useAppDispatch()
  const { project } = useAppSelector((state) => state.projects)

  useEffect(() => {
    if (id) {
      const idInt = Number(id as string)
      if (Number.isNaN(idInt)) {
        return router.back()
      }
      dispatch(fetchProject(idInt))
    }
  }, [dispatch, id])

  return (
    <PageLayout windowTitle={`Project | ${id}`}>
      <NavBar />
      <Container maxW="container.xl">
        <Heading>{project.name}</Heading>
        <Divider />
        <FileTable project_id={Number(id)} />
      </Container>
    </PageLayout>
  )
}

export default ProjectDetails
