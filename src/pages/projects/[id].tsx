import NavBar from '@/components/NavBar'
import PageLayout from '@/components/PageLayout'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import {
  Container,
  Flex,
  Heading,
  IconButton,
  Input,
  Link,
  Text,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { fetchFiles, fetchProject, uploadFile } from '@/slices/projects'
import { Column } from 'react-table'
import BaseTable from '@/components/Table/BaseTable'
import { Files } from '../api/entity/files'

const ProjectDetails = () => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useAppDispatch()
  const { project, files } = useAppSelector((state) => state.projects)
  const [file, setFile] = useState<File>()

  const onUpload = async () => {
    if (file) {
      dispatch(uploadFile({ id: Number(id as string), file }))
    }
  }
  useEffect(() => {
    if (id) {
      const idInt = Number(id as string)
      dispatch(fetchProject(idInt))
      dispatch(fetchFiles(idInt))
    }
  }, [id])

  const columns: Column<Files>[] = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
    {
      Header: 'url',
      accessor: 'url',
      Cell: ({ value }) => (
        <Link href={value} isExternal>
          <Text>{value}</Text>
        </Link>
      ),
    },
  ]

  return (
    <PageLayout windowTitle={`Project | ${id}`}>
      <NavBar />
      <Container maxW="container.xl">
        <Flex py={4}>
          <Heading>{project.name}</Heading>
          <Flex marginLeft="auto">
            <Input
              type="file"
              size="md"
              onChange={(e) => e.target.files && setFile(e.target.files[0])}
              mx={4}
            />
            <IconButton
              colorScheme="teal"
              aria-label="Call Segun"
              size="md"
              icon={<AddIcon />}
              mx={4}
              onClick={onUpload}
            />
          </Flex>
        </Flex>

        <BaseTable columns={columns} data={files} />
      </Container>
    </PageLayout>
  )
}

export default ProjectDetails
