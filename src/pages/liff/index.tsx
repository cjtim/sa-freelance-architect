import PageLayout from '@/components/PageLayout'
import BaseTable from '@/components/Table/BaseTable'
import { Photo } from '@API/entity/photo'
import { fetchPhotos, uploadFile } from '@/slices/photos'
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

const buyGold1: React.FC = () => {
  const [file, setFile] = useState<any>(null)
  const { value, url } = useAppSelector((state) => state.photos)
  const dispatch = useAppDispatch()
  const onUpload = async () => {
    dispatch(uploadFile(file))
  }
  useEffect(() => {
    dispatch(fetchPhotos())
  }, [dispatch])

  const columns: Column<Photo>[] = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Desc', accessor: 'description' },
    { Header: 'filename', accessor: 'filename' },
    { Header: 'views', accessor: 'views' },
    { Header: 'Published', accessor: 'isPublished' },
  ]

  return (
    <PageLayout windowTitle="Photos table">
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
        <Link href={url} isExternal>
          <Text>{url}</Text>
        </Link>
        <BaseTable data={value} columns={columns} my={4} />
      </Container>
    </PageLayout>
  )
}

export default buyGold1
