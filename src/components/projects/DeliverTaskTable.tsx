import BaseTable from '@/components/Table/BaseTable'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { Flex, Heading, Button, useClipboard } from '@chakra-ui/react'
import React from 'react'
import { Column } from 'react-table'
import { DeliverTask } from '@/pages/api/entity'
import { formatDate } from '@/utils/date'
import router from 'next/router'
import {
  deleteDeliverTaskById,
  fetchDeliverTaskByProject,
} from '@/slices/deliver_task'
import { hostname } from '@/utils/hostname'
import { CopyIcon } from '@chakra-ui/icons'

interface Props {
  project_id: number
}

const DeliverTaskTable: React.FC<Props> = ({ project_id }) => {
  const { deliverTasks } = useAppSelector((state) => state.deliverTasks)
  const dispatch = useAppDispatch()

  const onDelete = async (task_id: number) => {
    await dispatch(deleteDeliverTaskById(task_id))
    // refresh data in slice after delete some row
    dispatch(fetchDeliverTaskByProject(project_id))
  }

  const columns: Column<DeliverTask>[] = [
    {
      Header: 'Status',
      accessor: 'status',
    },
    {
      Header: 'Note',
      accessor: 'note',
    },
    {
      Header: 'Shipped date',
      accessor: 'actual_date',
      Cell: ({ value }) => (value ? formatDate(value) : ''),
    },
    {
      Header: 'Due date',
      accessor: 'due_date',
      Cell: ({ value }) => formatDate(value),
    },
    {
      Header: 'Edit',
      accessor: undefined,
      Cell: ({ row }: any) => (
        <Button
          colorScheme="blue"
          size="sm"
          onClick={() =>
            router.push(
              `/projects/${project_id}/deliverTask/${row.original.task_id}`,
            )
          }
        >
          Edit
        </Button>
      ),
    },
    {
      Header: 'Delete',
      accessor: undefined,
      Cell: ({ row }: any) => (
        <Button
          colorScheme="red"
          size="sm"
          onClick={() => onDelete(row.original.task_id)}
        >
          Delete
        </Button>
      ),
    },
    {
      Header: 'คัดลอกลิงค์ สำหรับลูกค้าส่งใบเสร็จ',
      accessor: undefined,
      Cell: ({ row }: any) => {
        const { hasCopied, onCopy } = useClipboard(
          `${hostname}/customer/deliverTask/${row.original.task_id}`,
        )
        return (
          <Button onClick={onCopy} ml={2}>
            <CopyIcon />
            {hasCopied ? 'Copied' : 'Copy'}
          </Button>
        )
      },
    },
  ]

  return (
    <>
      <Flex align="center" py={4}>
        <Heading size="md">Deliver Task (งวดการส่งงาน)</Heading>
        <Button
          marginLeft="auto"
          colorScheme="green"
          onClick={() =>
            router.push(`/projects/${project_id}/deliverTask/create`)
          }
        >
          สร้างงวดใหม่
        </Button>
      </Flex>
      <BaseTable columns={columns} data={deliverTasks || []} />
    </>
  )
}

export default DeliverTaskTable
