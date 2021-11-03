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
  Flex,
  SimpleGrid,
  HStack,
} from '@chakra-ui/react'
import { fetchProject } from '@/slices/projects'
import { fetchFileListByProject } from '@/slices/file_list'
import { fetchContractByProject } from '@/slices/contract'
import { fetchDeliverTaskByProject } from '@/slices/deliver_task'
import { GiSofa } from 'react-icons/gi'
import { hostname } from '@/utils/hostname'
import { formatDate } from '@/utils/date'
import { CopyIcon } from '@chakra-ui/icons'
import FileTable from '../../../components/projects/FileTable'
import DeliverTaskTable from '../../../components/projects/DeliverTaskTable'

const ProjectDetails = () => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useAppDispatch()
  const { project } = useAppSelector((state) => state.projects)
  const { contractByProject } = useAppSelector((state) => state.contracts)
  const { deliverTasks } = useAppSelector((state) => state.deliverTasks)
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
        <Flex>
          <Heading py="4">{project.name}</Heading>
          <HStack marginLeft="auto">
            <Button
              colorScheme="green"
              onClick={() => router.push(`/projects/${id}/update`)}
            >
              แก้ไขโปรเจค
            </Button>
            <Button
              colorScheme="green"
              onClick={() => router.push(`/projects/${id}/contract`)}
            >
              แก้สัญญา
            </Button>
          </HStack>
        </Flex>
        <SimpleGrid columns={2} spacing="4" maxW="md">
          <Heading size="sm">State:</Heading>
          <Text>{project?.status}</Text>

          <Heading size="sm">Customer:</Heading>
          <Text>
            {project.customer?.name} Tel.
            {project.customer?.phone}
          </Text>

          <Heading size="sm">Start date: </Heading>
          <Text>{formatDate(project?.started_when)}</Text>

          <Heading size="sm">Estimated date:</Heading>
          <Text>{formatDate(project?.estimated_when)}</Text>

          <Heading size="sm">Compensation:</Heading>
          <Text>{contractByProject?.compensation}</Text>

          <Heading size="sm">Installment:</Heading>
          <Text>
            {`${deliverTasks?.length}/`}
            {contractByProject?.installment}
          </Text>
        </SimpleGrid>

        <Icon as={GiSofa} fontSize="3xl" mx="2" />
        <Button
          my={4}
          colorScheme="blue"
          onClick={() => router.push(`/projects/${id}/furnitures`)}
        >
          เฟอร์นิเจอร์ของโปรเจ็ค
        </Button>
        <Button onClick={onCopy} ml={2}>
          <CopyIcon />
          {hasCopied ? 'Copied' : 'คัดลอกลิงค์ สำหรับลูกค้าเลือกเฟอร์นิเจอร์'}
        </Button>
        <Divider />

        <DeliverTaskTable project_id={Number(id)} />
        <Divider />

        <FileTable project_id={Number(id)} />
      </Container>
    </PageLayout>
  )
}

export default ProjectDetails
