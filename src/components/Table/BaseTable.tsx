/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-shadow */
import {
  Box,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
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

// eslint-disable-next-line @typescript-eslint/ban-types
export interface BaseTableProps<T extends object = {}> {
  data: T[]
  columns: Column<T>[]
  pageSizeOptions?: number[]
  isPaginationEnabled?: boolean
}

const BaseTable = <T extends object = {}>({
  data,
  columns,
}: BaseTableProps<T>) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<T>(
    {
      columns,
      data,
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useSortBy,
    usePagination,
  )

  return (
    <Box bg="white" borderRadius="lg">
      <Table {...getTableProps()}>
        {data.length === 0 && <NoDataCaption />}
        <Thead mb={8}>
          {headerGroups.map((headerGroup, index) => (
            <Tr
              {...headerGroup.getHeaderGroupProps()}
              // eslint-disable-next-line react/no-array-index-key
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
          {rows.map((row, index) => {
            prepareRow(row)
            return (
              <Tr
                {...row.getRowProps()}
                // eslint-disable-next-line react/no-array-index-key
                key={`tbody-tr-${index}`}
                _hover={{ bg: 'gray.50' }}
                // eslint-disable-next-line jsx-a11y/aria-role
                role="addicon"
              >
                {row.cells.map((cell, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Td {...cell.getCellProps()} key={`tbody-td-${index}`} py={4}>
                    {cell.render('Cell')}
                  </Td>
                ))}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </Box>
  )
}

export default BaseTable
