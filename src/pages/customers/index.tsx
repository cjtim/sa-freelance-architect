import NavBar from '@/components/NavBar'
import PageLayout from '@/components/PageLayout'
import BaseTable from '@/components/Table/BaseTable'
import { Button, Container, Flex, Heading, Link } from '@chakra-ui/react'
import router from 'next/router'
import React, { useEffect } from 'react'
import NextLink from 'next/link'
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
      Cell: ({ value, row }) => (
        <Link as={NextLink} href={`/customers/${row.original.customer_id}`}>
          <a>{value}</a>
        </Link>
      ),
    },
    {
      Header: 'Phone',
      accessor: 'phone',
      Cell: ({ value, row }) => (
        <Link as={NextLink} href={`/projects/${row.original.customer_id}`}>
          <a>{value}</a>
        </Link>
      ),
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
            onClick={() => router.push('/projects/create')}
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
