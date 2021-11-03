import PageLayout from '@/components/PageLayout'
import { fetchProjectFurnitures } from '@/slices/project_furniture'
import { useAppDispatch } from '@/store/hook'

import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { fetchFurnitures } from '@/slices/funiture'
import ProjectFurnitureForm from '@/components/projects/ProjectFurnitureForm'
import { Button, Container, useClipboard } from '@chakra-ui/react'
import NavBar from '@/components/NavBar'
import { CopyIcon } from '@chakra-ui/icons'
import { hostname } from '@/utils/hostname'

const ProjectFurniturePage = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { id } = router.query
  const { hasCopied, onCopy } = useClipboard(
    `${hostname}/customer/furnitures/${id}`,
  )

  useEffect(() => {
    dispatch(fetchProjectFurnitures(Number(id)))
    dispatch(fetchFurnitures())
  }, [id])

  return (
    <PageLayout windowTitle="Contract">
      <Container maxW="container.xl">
        <NavBar />

        <Button onClick={onCopy} my={4}>
          <CopyIcon />
          {hasCopied ? 'Copied' : 'คัดลอกลิงค์ สำหรับลูกค้าเลือกเฟอร์นิเจอร์'}
        </Button>
        <ProjectFurnitureForm project_id={Number(id)} />
      </Container>
    </PageLayout>
  )
}
export default ProjectFurniturePage
