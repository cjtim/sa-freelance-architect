/* eslint-disable no-shadow */
import {
  Box,
  Button,
  ButtonGroup,
  ChakraProps,
  Heading,
  HStack,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import {
  useTable,
  Column,
  useSortBy,
  usePagination,
  useFilters,
  useGlobalFilter,
} from 'react-table'
import NoDataCaption from './NoDataCaption'

export interface BaseTableProps<T extends object = {}>
  extends Partial<ChakraProps> {
  data: T[]
  columns: Column<T>[]
  pageSizeOptions?: number[]
  isPaginationEnabled?: boolean
}

const BaseTable = <T extends object = {}>({
  data,
  columns,
  ...other
}: BaseTableProps<T>) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    page,
    rows,
  } = useTable<T>(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useSortBy,
    usePagination,
  )

  return (
    <Box borderRadius="lg" borderWidth="1px" {...other}>
      <Table {...getTableProps()}>
        {data.length === 0 && <NoDataCaption />}
        <Thead mb={8}>
          {headerGroups.map((headerGroup, index) => (
            <Tr
              {...headerGroup.getHeaderGroupProps()}
              key={`theader-tr-${index}`}
            >
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>
                  <VStack
                    justify="flex-start"
                    shouldWrapChildren
                    align="flex-start"
                  >
                    <Heading size="xs" textAlign="start">
                      {column.render('Header')}
                    </Heading>
                  </VStack>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row)
            return (
              <Tr
                {...row.getRowProps()}
                key={`tbody-tr-${index}`}
                // eslint-disable-next-line jsx-a11y/aria-role
                role="addicon"
              >
                {row.cells.map((cell, index) => (
                  <Td {...cell.getCellProps()} key={`tbody-td-${index}`} py={4}>
                    {cell.render('Cell')}
                  </Td>
                ))}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
      <HStack justify="space-between" p={2}>
        <HStack shouldWrapChildren spacing={4}>
          <ButtonGroup isAttached variant="outline">
            <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {'<<'}
            </Button>
            <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {'<'}
            </Button>
            <Button onClick={() => nextPage()} disabled={!canNextPage}>
              {'>'}
            </Button>
            <Button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {'>>'}
            </Button>
          </ButtonGroup>
          <Box>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
            | Go to page:{' '}
            <Input
              type="number"
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
              style={{ width: '100px' }}
            />
          </Box>
        </HStack>
        <HStack shouldWrapChildren spacing={2}>
          <Text>Total {rows.length} Rows</Text>
          <Select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[3, 5, 10, 15, 20, 30, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </HStack>
      </HStack>
    </Box>
  )
}

export default BaseTable
