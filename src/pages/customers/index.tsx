import NavBar from '@/components/NavBar'
import PageLayout from '@/components/PageLayout'
import BaseTable from '@/components/Table/BaseTable'
import { Button, Container, Flex, Heading } from '@chakra-ui/react'
import router from 'next/router'
import React, { useEffect } from 'react'
import { Column } from 'react-table'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { fetchCustomers } from '@/slices/customer'
import { Customer } from '../api/entity'

const CustomerListPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { customers } = useAppSelector((state) => state.customers)
  useEffect(() => {
    dispatch(fetchCustomers())
  }, [])

  const columns: Column<Customer>[] = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Phone',
      accessor: 'phone',
    },
    {
      Header: 'Owned Project',
      accessor: 'projects',
      Cell: ({ value }) => value?.length,
    },
  ]

  return (
    <PageLayout windowTitle="Customer list">
      <NavBar />
      <Container maxW="container.xl">
        <Flex py={4}>
          <Heading>Customers</Heading>
          <Button
            marginLeft="auto"
            colorScheme="green"
            onClick={() => router.push('/customers/create')}
          >
            Create
          </Button>
        </Flex>
        <BaseTable data={customers} columns={columns} my={4} />
      </Container>
    </PageLayout>
  )
}

export default CustomerListPage
