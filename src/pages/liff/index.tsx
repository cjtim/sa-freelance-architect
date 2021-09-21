import PageLayout from '@/components/PageLayout'
import BaseTable from '@/components/Table/BaseTable'
import { Photo } from '@API/entity/photo'
import { fetchPhotos } from '@/slices/photos'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import React, { useEffect } from 'react'
import { Column } from 'react-table'
import NavBar from '@/components/NavBar'
import { Box, Container } from '@chakra-ui/react'

const buyGold1: React.FC = () => {
  const { value } = useAppSelector((state) => state.photos)
  const dispatch = useAppDispatch()

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
        <BaseTable data={value} columns={columns} my={4} />
      </Container>
    </PageLayout>
  )
}

export default buyGold1
