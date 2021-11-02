import BaseTable from '@/components/Table/BaseTable'
import DeliverTaskForm from '@/components/projects/DeliverTaskForm'
import PageLayout from '@/components/PageLayout'
import { DeliverTask, Receipt } from '@/pages/api/entity'
import {
  upsertDeliverTaskByProject,
  fetchDeliverTaskById,
} from '@/slices/deliver_task'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import {
  Container,
  Image,
  Flex,
  Input,
  Button,
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useClipboard,
  Stack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { Column } from 'react-table'
import { AddIcon } from '@chakra-ui/icons'
import { createReceiptByTaskId, fetchReceiptByTaskId } from '@/slices/receipts'
import { hostname } from '@/utils/hostname'

const columns: Column<Partial<Receipt>>[] = [
  {
    Header: 'Image',
    accessor: 'receipt_img_url',
    Cell: ({ value }) => <Image src={value} height="100px" />,
  },
  {
    Header: 'วันที่โอน',
    accessor: 'receipt_date',
  },
  {
    Header: 'Amount',
    accessor: 'amount',
  },
]
const DeliverTaskEditPage = () => {
  const { receipts } = useAppSelector((state) => state.receipts)
  const { deliverTask, loading: deliverTasksLoading } = useAppSelector(
    (state) => state.deliverTasks,
  )
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { id, task_id } = router.query
  const [file, setFile] = useState<File>()
  const noteRef = useRef<any>(null)
  const { hasCopied, onCopy } = useClipboard(
    `${hostname}/customer/deliverTask/${task_id}`,
  )

  const onUpload = async () => {
    if (file && noteRef?.current.value) {
      await dispatch(
        createReceiptByTaskId({
          receipt: {
            amount: noteRef?.current.value || 0,
            deliverTask: { task_id: Number(task_id) },
            receipt_date: new Date(),
          },
          file,
        }),
      )
      dispatch(fetchReceiptByTaskId(Number(task_id)))
    }
  }

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
    if (!Number.isNaN(task_id)) {
      dispatch(fetchDeliverTaskById(Number(task_id)))
      dispatch(fetchReceiptByTaskId(Number(task_id)))
    }
  }, [])

  return (
    <PageLayout windowTitle="Deliver Task">
      <Container maxW="container.xl">
        {!deliverTasksLoading && (
          <DeliverTaskForm onSubmit={onSubmit} initialValues={deliverTask} />
        )}
      </Container>
      <Container maxW="container.xl" pt="12">
        <Stack>
          <Flex>
            <Heading>Receipts list</Heading>
            <Button onClick={onCopy} ml={2}>
              {hasCopied ? 'Copied' : 'คัดลอกลิงค์ สำหรับลูกค้าส่งใบเสร็จ'}
            </Button>
          </Flex>
          <Flex py="2">
            <Input
              type="file"
              size="md"
              onChange={(e) => e.target.files && setFile(e.target.files[0])}
              mx={4}
            />
            <NumberInput size="md" w="md">
              <NumberInputField ref={noteRef} placeholder="Amount ฿(bath)" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Button
              colorScheme="green"
              aria-label="Upload"
              size="md"
              onClick={onUpload}
              mx="4"
            >
              Upload
            </Button>
          </Flex>
        </Stack>
        <BaseTable data={receipts || []} columns={columns} />
      </Container>
    </PageLayout>
  )
}

export default DeliverTaskEditPage
