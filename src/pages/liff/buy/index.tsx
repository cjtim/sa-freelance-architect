import PageLayout from '@/components/PageLayout'
import BaseTable from '@/components/Table/BaseTable'
import { Photo } from '@/pages/api/entity/photo'
import { fetchPhotos } from '@/slices/photos'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import {
  Image,
  Box,
  Container,
  Text,
  Button,
  Stack,
  HStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'
import { Column } from 'react-table'

const buyGold1: React.FC = () => {
  const router = useRouter()
  const { unit, amount } = router.query
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
    <PageLayout windowTitle="ซื้อทองคำ">
      <Container>
        <Box borderWidth="1px" rounded="lg" overflow="hidden">
          <Stack align="center">
            <Box w="150px" borderRadius="sm">
              <Image src="https://images.unsplash.com/photo-1598561222812-63429c3eee2f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80" />
            </Box>
            <Box>
              <Text fontSize="h1">{`${amount} ${unit}`}</Text>
            </Box>
            <HStack spacing={2}>
              <Button>ยกเลิก</Button>
              <Button>ซื้อ</Button>
            </HStack>
          </Stack>
        </Box>
        <BaseTable data={value} columns={columns} />
      </Container>
    </PageLayout>
  )
}

export default buyGold1
