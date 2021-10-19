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
} from '@chakra-ui/react'
import { Field, FieldMetaProps, Form, Formik, FormikProps } from 'formik'
import { DatePicker } from 'react-rainbow-components'

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
          <Formik
            initialValues={contractByProject}
            validationSchema={Yup.object().shape({
              compensation: Yup.number().required(),
              started_when: Yup.date().required(),
              estimated_when: Yup.date().required(),
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
              values,
              setFieldValue,
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

                  <FormControl
                    isInvalid={
                      (errors.estimated_when && touched.estimated_when) || false
                    }
                  >
                    <FormLabel htmlFor="estimated_when">
                      estimated_when
                    </FormLabel>
                    <DatePicker
                      id="estimated_when"
                      value={values.estimated_when}
                      onChange={(value) =>
                        setFieldValue('estimated_when', value)
                      }
                      // label="DatePicker Label"
                      formatStyle="large"
                    />
                    <FormErrorMessage>{errors.estimated_when}</FormErrorMessage>
                  </FormControl>

                  {/* Started when */}
                  <FormControl
                    isInvalid={
                      (errors.started_when && touched.started_when) || false
                    }
                  >
                    <FormLabel htmlFor="started_when">started_when</FormLabel>
                    <DatePicker
                      id="started_when"
                      value={values.started_when}
                      onChange={(value) => setFieldValue('started_when', value)}
                      // label="DatePicker Label"
                      formatStyle="large"
                    />
                    <FormErrorMessage>{errors.started_when}</FormErrorMessage>
                  </FormControl>

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
                  <Button
                    mt={4}
                    colorScheme="teal"
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    Submit
                  </Button>
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
