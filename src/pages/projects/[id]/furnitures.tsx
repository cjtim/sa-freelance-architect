import PageLayout from '@/components/PageLayout'
import BaseTable from '@/components/Table/BaseTable'
import { Furniture } from '@/pages/api/entity'
import {
  fetchProjectFurnitures,
  ProjectFurnitureAdd,
  ProjectFurnitureDelete,
  upsertProjectFurnitures,
} from '@/slices/project_furniture'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import {
  Container,
  IconButton,
  Flex,
  Box,
  Image,
  Link,
  Button,
} from '@chakra-ui/react'
import NextLink from 'next/link'

import { useRouter } from 'next/router'
import React, { useEffect, useState, useRef } from 'react'
import { Column } from 'react-table'
import Select from 'react-select'
import { fetchFurnitures } from '@/slices/funiture'
import { AddIcon } from '@chakra-ui/icons'

const ProjectFurniturePage = () => {
  const ref = useRef<any>(undefined)
  const router = useRouter()
  const { id } = router.query
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
        project_id: Number(id),
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

  useEffect(() => {
    dispatch(fetchProjectFurnitures(Number(id)))
    dispatch(fetchFurnitures())
  }, [id])

  return (
    <PageLayout windowTitle="Contract">
      <Container maxW="container.xl">
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
                project_id: Number(id),
              }),
            )
          }
        >
          Update
        </Button>
        <BaseTable
          data={projectFurnitures?.map((pjfur) => pjfur.furniture)}
          columns={columns}
        />
      </Container>
    </PageLayout>
  )
}
export default ProjectFurniturePage
