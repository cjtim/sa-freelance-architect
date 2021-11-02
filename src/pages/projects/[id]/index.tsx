import NavBar from '@/components/NavBar'
import PageLayout from '@/components/PageLayout'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import {
  Container,
  Heading,
  Divider,
  Button,
  Text,
  Icon,
  useClipboard,
} from '@chakra-ui/react'
import { fetchProject } from '@/slices/projects'
import { fetchFileListByProject } from '@/slices/file_list'
import { fetchContractByProject } from '@/slices/contract'
import { fetchDeliverTaskByProject } from '@/slices/deliver_task'
import { GiSofa } from 'react-icons/gi'
import { hostname } from '@/utils/hostname'
import FileTable from '../../../components/projects/FileTable'
import ContractTable from '../../../components/projects/ContractTable'
import DeliverTaskTable from '../../../components/projects/DeliverTaskTable'

const ProjectDetails = () => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useAppDispatch()
  const { project } = useAppSelector((state) => state.projects)
  const { hasCopied, onCopy } = useClipboard(
    `${hostname}/customer/furnitures/${id}`,
  )

  useEffect(() => {
    if (id) {
      const idInt = Number(id as string)
      if (Number.isNaN(idInt)) {
        return router.back()
      }
      dispatch(fetchProject(idInt))
      dispatch(fetchFileListByProject(idInt))
      dispatch(fetchContractByProject(idInt))
      dispatch(fetchDeliverTaskByProject(idInt))
    }
  }, [id])

  return (
    <PageLayout windowTitle={`Project | ${project?.name || id}`}>
      <NavBar />
      <Container maxW="container.xl">
        <Heading>{project.name}</Heading>
        <Text>State: {project?.status}</Text>
        <Divider />

        <Icon as={GiSofa} fontSize="3xl" mx="2" />
        <Button
          my={4}
          colorScheme="blue"
          onClick={() => router.push(`/projects/${id}/furnitures`)}
        >
          View Project funitures
        </Button>
        <Button onClick={onCopy} ml={2}>
          {hasCopied ? 'Copied' : 'คัดลอกลิงค์ สำหรับลูกค้าเลือกเฟอร์นิเจอร์'}
        </Button>
        <Divider />

        <ContractTable project_id={Number(id)} />
        <Divider />

        <FileTable project_id={Number(id)} />
        <Divider />

        <DeliverTaskTable project_id={Number(id)} />
      </Container>
    </PageLayout>
  )
}

export default ProjectDetails
