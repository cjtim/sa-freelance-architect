import { useAppSelector } from '@/store/hook'
import { Flex, Heading, Button, Text, Stack } from '@chakra-ui/react'
import React from 'react'
import router from 'next/router'
import { formatDate } from '@/utils/date'

interface Props {
  project_id: number
}
const ContractTable: React.FC<Props> = ({ project_id }) => {
  const { contractByProject } = useAppSelector((state) => state.contracts)

  return (
    <>
      <Flex align="center" py={4}>
        <Heading size="md">Project Contracts</Heading>
        <Button
          marginLeft="auto"
          colorScheme="green"
          onClick={() => router.push(`/projects/${project_id}/contract`)}
        >
          Create/Edit
        </Button>
      </Flex>
      <Stack>
        <Text>Compensation: {contractByProject?.compensation}</Text>
        <Text>
          Estimated time: {formatDate(contractByProject?.estimated_when)}
        </Text>
        <Text>Installment: {contractByProject?.installment}</Text>
        <Text>Updated at: {contractByProject?.updated_at}</Text>
      </Stack>
    </>
  )
}

export default ContractTable
