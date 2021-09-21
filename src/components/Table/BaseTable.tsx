/* eslint-disable no-shadow */
import {
  Box,
  ChakraProps,
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
          {rows.map((row, index) => {
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
    </Box>
  )
}

export default BaseTable
