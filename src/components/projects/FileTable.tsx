import BaseTable from '@/components/Table/BaseTable'
import {
  createFile,
  deleteFile,
  fetchFileListByProject,
} from '@/slices/file_list'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { AddIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import {
  Flex,
  Heading,
  IconButton,
  Input,
  Link,
  Button,
} from '@chakra-ui/react'
import router from 'next/router'
import React, { useRef, useState } from 'react'
import { Column } from 'react-table'
import { FileList } from '@/pages/api/entity'
import { formatDate } from '@/utils/date'

interface Props {
  project_id: number
}

const FileTable: React.FC<Props> = ({ project_id }) => {
  const dispatch = useAppDispatch()
  const { fileListByProject } = useAppSelector((state) => state.fileList)
  const [file, setFile] = useState<File>()
  const noteRef = useRef<any>(null)

  const onUpload = async () => {
    if (file) {
      await dispatch(
        createFile({
          fileList: {
            name: file.name,
            project: { project_id },
            url: '',
            notes: noteRef?.current?.value || '',
          },
          file,
        }),
      )
      dispatch(fetchFileListByProject(project_id))
    }
  }

  const handleDelete = async (file_id: number) => {
    await dispatch(deleteFile(file_id))
    dispatch(fetchFileListByProject(project_id))
  }

  const columns: Column<FileList>[] = [
    {
      Header: 'Name',
      accessor: 'name',
      Cell: ({ value, row }) => (
        <Link href={row.original.url} isExternal>
          {value}
          <ExternalLinkIcon mx="2px" />
        </Link>
      ),
    },
    {
      Header: 'Notes',
      accessor: 'notes',
    },
    {
      Header: 'Created at',
      accessor: 'created_at',
      Cell: ({ value }) => formatDate(value || new Date()),
    },
    {
      Header: 'Delete',
      accessor: undefined,
      Cell: ({ row }: any) => (
        <Button
          colorScheme="red"
          size="sm"
          onClick={() => handleDelete(row.original.file_id)}
        >
          Delete
        </Button>
      ),
    },
  ]

  return (
    <>
      <Flex align="center" py={4}>
        <Heading size="md">Project Files</Heading>
        <Flex marginLeft="auto">
          <Input
            type="file"
            size="md"
            onChange={(e) => e.target.files && setFile(e.target.files[0])}
            mx={4}
          />
          <Input placeholder="Notes?" ref={noteRef} />
          <IconButton
            colorScheme="green"
            aria-label="Call Segun"
            size="md"
            icon={<AddIcon />}
            mx={4}
            onClick={onUpload}
          />
        </Flex>
      </Flex>
      <BaseTable columns={columns} data={fileListByProject || []} />
    </>
  )
}

export default FileTable
