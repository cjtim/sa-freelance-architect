import PageLayout from '@/components/PageLayout'
import BaseTable from '@/components/Table/BaseTable'
import { Photo } from '@/pages/api/entity/photo'
import { fetchPhotos } from '@/slices/photos'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { Container } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Column } from 'react-table'

const buyGold1: React.FC = () => {
  const { value } = useAppSelector((state) => state.photos)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchPhotos())
  }, [dispatch])
  const columns: Column<Photo>[] = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Desc', accessor: 'description' },
    { Header: 'filename', accessor: 'filename' },
    { Header: 'views', accessor: 'views' },
    { Header: 'Published', accessor: 'isPublished' },
  ]

  return (
    <PageLayout windowTitle="Photos table">
      <Container>
        <BaseTable data={value} columns={columns} />
      </Container>
    </PageLayout>
  )
}

export default buyGold1
