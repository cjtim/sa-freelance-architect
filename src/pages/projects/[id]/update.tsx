import PageLayout from '@/components/PageLayout'
import ProjectForm from '@/components/projects/ProjectForm'
import { Project } from '@/pages/api/entity'
import { fetchCustomers } from '@/slices/customer'
import { updateProject, fetchProject } from '@/slices/projects'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { Container } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const UpdateProject: React.FC = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { id } = router.query
  const { customers, loading: customerLoading } = useAppSelector(
    (state) => state.customers,
  )
  const { project, loading: projectLoading } = useAppSelector(
    (state) => state.projects,
  )

  const handleSubmit = async (values: Project) => {
    if (values.name) {
      await dispatch(updateProject(values))
      router.push(`/projects/${id}`)
    }
  }
  useEffect(() => {
    dispatch(fetchCustomers())
    dispatch(fetchProject(Number(id)))
  }, [])

  return (
    <PageLayout windowTitle="update project">
      <Container maxW="container.xl">
        {!(projectLoading || customerLoading) && (
          <ProjectForm
            customers={customers}
            onSubmit={handleSubmit}
            initialValues={project}
          />
        )}
      </Container>
    </PageLayout>
  )
}

export default UpdateProject
