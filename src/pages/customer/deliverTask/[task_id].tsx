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
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { Column } from 'react-table'
import { createReceiptByTaskId, fetchReceiptByTaskId } from '@/slices/receipts'

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

  const onSubmit = async (values: DeliverTask, file?: File) => {
    const action = await dispatch(
      upsertDeliverTaskByProject({
        deliverTask: {
          ...values,
          task_id: Number(task_id),
          project: { project_id: Number(id) },
        },
        file,
      }),
    )
    if (action.meta.requestStatus === 'fulfilled') {
      dispatch(fetchReceiptByTaskId(Number(task_id)))
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
      <Container maxW="container.xl" pt="18">
        {!deliverTasksLoading && (
          <DeliverTaskForm
            onSubmit={onSubmit}
            initialValues={deliverTask}
            isDisable
          />
        )}
      </Container>
      <Container maxW="container.xl" pt="12">
        <Flex>
          <Heading size="lg">ใบเสร็จของงานงวดนี้</Heading>
          <HStack py="2" marginLeft="auto">
            <Input
              type="file"
              size="md"
              onChange={(e) => e.target.files && setFile(e.target.files[0])}
              mx={4}
            />
            <NumberInput size="md" w="md">
              <NumberInputField ref={noteRef} placeholder="จำนวนเงิน ฿(บาท)" />
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
              ส่งใบเสร็จ
            </Button>
          </HStack>
        </Flex>
        <BaseTable data={receipts || []} columns={columns} />
      </Container>
    </PageLayout>
  )
}

export default DeliverTaskEditPage
