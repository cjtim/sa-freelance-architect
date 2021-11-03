import BaseTable from '@/components/Table/BaseTable'
import { Furniture } from '@/pages/api/entity'
import {
  ProjectFurnitureAdd,
  ProjectFurnitureDelete,
  upsertProjectFurnitures,
} from '@/slices/project_furniture'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import {
  Text,
  IconButton,
  Flex,
  Box,
  Image,
  Link,
  Button,
  Heading,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import React, { useState, useRef } from 'react'
import { Column } from 'react-table'
import Select from 'react-select'
import { AddIcon } from '@chakra-ui/icons'

interface Props {
  project_id: number
}

const ProjectFurnitureForm: React.FC<Props> = ({ project_id }) => {
  const ref = useRef<any>(undefined)
  const dispatch = useAppDispatch()
  const [selected, setSelected] = useState<{ value: number; label: string }[]>(
    [],
  )
  const { projectFurnitures } = useAppSelector(
    (state) => state.projectFurnitures,
  )
  const { furnitures } = useAppSelector((state) => state.furnitures)

  const onAdd = async () => {
    const idList = selected.map((i) => i.value)
    ref.current?.clearValue()
    dispatch(
      ProjectFurnitureAdd({
        furniture_ids: idList,
        project_id,
        furnitures,
      }),
    )
  }

  const onDelete = (furniture_id: number) => {
    dispatch(ProjectFurnitureDelete(furniture_id))
  }

  const columns: Column<Partial<Furniture>>[] = [
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
    {
      Header: 'Delete',
      accessor: undefined,
      Cell: ({ row }: any) => (
        <Button
          colorScheme="red"
          onClick={() => onDelete(row.original.furniture_id)}
        >
          Delete
        </Button>
      ),
    },
  ]

  return (
    <>
      <Flex>
        <Box w="100%">
          <Select
            defaultValue={selected}
            isMulti
            options={
              furnitures
                ?.filter(
                  (i) =>
                    !projectFurnitures
                      .map((i) => i?.furniture?.furniture_id)
                      .includes(i?.furniture_id),
                )
                ?.map((i) => ({
                  value: i.furniture_id,
                  label: i.furniture_name,
                })) as any
            }
            onChange={(values) => setSelected(values as any)}
            ref={ref}
          />
        </Box>
        <IconButton
          colorScheme="green"
          aria-label="Call Segun"
          size="md"
          icon={<AddIcon />}
          mx={4}
          onClick={onAdd}
        />
      </Flex>
      <Button
        marginLeft="auto"
        colorScheme="green"
        onClick={() =>
          dispatch(
            upsertProjectFurnitures({
              projectFurnitures,
              project_id,
            }),
          )
        }
      >
        Update
      </Button>
      <Flex py="4">
        <Heading size="md">Total selected:</Heading>
        <Text>
          {' '}
          {projectFurnitures
            ?.map((pjfur) => pjfur.furniture)
            .reduce(
              (prev, current) => prev + (current?.price_per_unit || 0),
              0,
            )}{' '}
          ฿Bath
        </Text>
      </Flex>
      <BaseTable
        data={projectFurnitures?.map((pjfur) => pjfur.furniture)}
        columns={columns}
      />
    </>
  )
}

export default ProjectFurnitureForm
