import DeliverTaskForm from '@/components/projects/DeliverTaskForm'
import PageLayout from '@/components/PageLayout'
import { DeliverTask } from '@/pages/api/entity'
import {
  upsertDeliverTaskByProject,
  fetchDeliverTaskById,
} from '@/slices/deliver_task'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { Container } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const DeliverTaskEditPage = () => {
  const { deliverTask } = useAppSelector((state) => state.deliverTasks)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { id, task_id } = router.query

  const onSubmit = async (values: DeliverTask) => {
    const action = await dispatch(
      upsertDeliverTaskByProject({
        ...values,
        task_id: Number(task_id),
        project: { project_id: Number(id) },
      }),
    )
    if (action.meta.requestStatus === 'fulfilled') {
      router.push(`/projects/${Number(id)}`)
    }
  }

  useEffect(() => {
    if (deliverTask?.task_id !== Number(task_id)) {
      dispatch(fetchDeliverTaskById(Number(task_id)))
    }
  }, [])

  return (
    <PageLayout windowTitle="Deliver Task">
      <Container maxW="container.lg">
        {deliverTask && (
          <DeliverTaskForm onSubmit={onSubmit} initialValues={deliverTask} />
        )}
      </Container>
    </PageLayout>
  )
}

export default DeliverTaskEditPage
