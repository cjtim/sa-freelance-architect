import NavBar from '@/components/NavBar'
import PageLayout from '@/components/PageLayout'
import BaseTable from '@/components/Table/BaseTable'
import { Furniture } from '@/pages/api/entity'
import { fetchFurnitures } from '@/slices/funiture'
import { useAppSelector, useAppDispatch } from '@/store/hook'
import { Container, Flex, Heading, Button, Link, Image } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Column } from 'react-table'

const FurnituresList: React.FC = () => {
  const { furnitures } = useAppSelector((state) => state.furnitures)
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    dispatch(fetchFurnitures())
  }, [dispatch])

  const columns: Column<Furniture>[] = [
    {
      Header: 'Name',
      accessor: 'img',
      Cell: ({ value }) => <Image src={value} height="100px" />,
    },
    {
      Header: 'Name',
      accessor: 'furniture_name',
      Cell: ({ value, row }) => (
        <Link as={NextLink} href={`/projects/${row.original.furniture_name}`}>
          <a>{value}</a>
        </Link>
      ),
    },
    {
      Header: 'Price',
      accessor: 'price_per_unit',
    },
  ]

  return (
    <PageLayout windowTitle="Furnitures table">
      <NavBar />
      <Container maxW="container.lg">
        <Flex py={4}>
          <Heading>Furnitures</Heading>
          <Button
            marginLeft="auto"
            colorScheme="green"
            onClick={() => router.push('/furnitures/create')}
          >
            Create
          </Button>
        </Flex>
        <BaseTable data={furnitures} columns={columns} my={4} />
      </Container>
    </PageLayout>
  )
}

export default FurnituresList
