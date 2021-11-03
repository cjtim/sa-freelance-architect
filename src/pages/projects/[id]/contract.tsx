import { Contract } from '@/pages/api/entity'
import { fetchContractByProject, upsertContract } from '@/slices/contract'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import React, { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import * as Yup from 'yup'
import PageLayout from '@/components/PageLayout'
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Heading,
  Flex,
} from '@chakra-ui/react'
import { Field, FieldMetaProps, Form, Formik, FormikProps } from 'formik'
import NavBar from '@/components/NavBar'

const ContractByProjectPage: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useAppDispatch()
  const { contractByProject } = useAppSelector((state) => state.contracts)

  useEffect(() => {
    if (id) {
      const idInt = Number(id as string)
      if (Number.isNaN(idInt)) {
        return router.back()
      }
      dispatch(fetchContractByProject(idInt))
    }
  }, [id])

  return useMemo(
    () => (
      <PageLayout windowTitle="Contract">
        <Container maxW="container.xl">
          <NavBar />
          <Heading py="4">แก้ไขสัญญา </Heading>
          <Formik
            initialValues={contractByProject}
            validationSchema={Yup.object().shape({
              compensation: Yup.number().required(),
              installment: Yup.number().required(),
            })}
            onSubmit={async (values, actions) => {
              await dispatch(
                upsertContract({
                  ...values,
                  project: { project_id: Number(id) },
                }),
              )
              router.push(`/projects/${id}`)
              actions.setSubmitting(false)
            }}
          >
            {({
              errors,
              touched,
              isSubmitting,
            }: FormikProps<Partial<Contract>>) => (
              <Form>
                <Stack spacing="2">
                  <Field name="compensation">
                    {({ field }: { field: FieldMetaProps<any> }) => (
                      <FormControl
                        isInvalid={
                          (errors.compensation && touched.compensation) || false
                        }
                      >
                        <FormLabel htmlFor="compensation">
                          Project compensation
                        </FormLabel>
                        <Input
                          {...field}
                          id="compensation"
                          placeholder="compensation"
                        />
                        <FormErrorMessage>
                          {errors.compensation}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="installment">
                    {({ field }: { field: FieldMetaProps<any> }) => (
                      <FormControl
                        isInvalid={
                          (errors.installment && touched.installment) || false
                        }
                      >
                        <FormLabel htmlFor="installment">installment</FormLabel>
                        <Input
                          {...field}
                          id="installment"
                          placeholder="installment"
                        />
                        <FormErrorMessage>
                          {errors.installment}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Flex>
                    <Button
                      mt={4}
                      mr={4}
                      colorScheme="red"
                      onClick={() => router.back()}
                    >
                      Cancel
                    </Button>
                    <Button
                      mt={4}
                      colorScheme="teal"
                      isLoading={isSubmitting}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Flex>
                </Stack>
              </Form>
            )}
          </Formik>
        </Container>
      </PageLayout>
    ),
    [contractByProject],
  )
}
export default ContractByProjectPage
