import PageLayout from '@/components/PageLayout'
import BaseTable from '@/components/Table/BaseTable'
import { fetchFiles, uploadFile } from '@/slices/photos'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import React, { useEffect, useState } from 'react'
import { Column } from 'react-table'
import NavBar from '@/components/NavBar'
import {
  Container,
  Flex,
  IconButton,
  Input,
  Link,
  Text,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { Files } from '../api/entity/files'

const buyGold1: React.FC = () => {
  const [file, setFile] = useState<File>()
  const { value } = useAppSelector((state) => state.photos)
  const dispatch = useAppDispatch()

  const onUpload = async () => {
    if (file) {
      dispatch(uploadFile(file))
      dispatch(fetchFiles())
    }
  }
  useEffect(() => {
    dispatch(fetchFiles())
  }, [dispatch])

  const columns: Column<Files>[] = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
    {
      Header: 'url',
      accessor: 'url',
      Cell: ({ value }) => (
        <Link href={value} isExternal>
          <Text>{value}</Text>
        </Link>
      ),
    },
  ]

  return (
    <PageLayout windowTitle="Files table">
      <NavBar />
      <Container maxW="container.lg">
        <Flex>
          <Input
            type="file"
            size="md"
            onChange={(e) => e.target.files && setFile(e.target.files[0])}
            p={1}
          />
          <IconButton
            colorScheme="teal"
            aria-label="Call Segun"
            size="md"
            icon={<AddIcon />}
            p={4}
            onClick={onUpload}
          />
        </Flex>

        <BaseTable data={value} columns={columns} my={4} />
      </Container>
    </PageLayout>
  )
}

export default buyGold1
