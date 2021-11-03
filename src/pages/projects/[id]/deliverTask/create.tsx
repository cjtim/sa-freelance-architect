import DeliverTaskForm from '@/components/projects/DeliverTaskForm'
import PageLayout from '@/components/PageLayout'
import { DeliverTask } from '@/pages/api/entity'
import { upsertDeliverTaskByProject } from '@/slices/deliver_task'
import { useAppDispatch } from '@/store/hook'
import { Container } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import NavBar from '@/components/NavBar'

const DeliverTaskCreatePage = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { id } = router.query

  const onSubmit = async (values: DeliverTask) => {
    const action = await dispatch(
      upsertDeliverTaskByProject({
        ...values,
        project: { project_id: Number(id) },
      }),
    )
    if (action.meta.requestStatus === 'fulfilled') {
      router.push(`/projects/${Number(id)}`)
    }
  }

  return (
    <PageLayout windowTitle="Deliver Task">
      <Container maxW="container.lg">
        <NavBar />
        <DeliverTaskForm onSubmit={onSubmit} />
      </Container>
    </PageLayout>
  )
}

export default DeliverTaskCreatePage
