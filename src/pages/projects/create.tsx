import NavBar from '@/components/NavBar'
import PageLayout from '@/components/PageLayout'
import { Project } from '@/pages/api/entity/project'
import { fetchCustomers } from '@/slices/customer'
import { createProject } from '@/slices/projects'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
} from '@chakra-ui/react'
import { Field, FieldMetaProps, Form, Formik, FormikProps } from 'formik'
import router from 'next/router'
import React, { useEffect } from 'react'
import * as Yup from 'yup'
import { DatePicker } from 'react-rainbow-components'

const ProjectCreate = () => {
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector((state) => state.projects)
  const { customers } = useAppSelector((state) => state.customers)

  useEffect(() => {
    dispatch(fetchCustomers())
  }, [])

  if (typeof window !== 'undefined') {
    return (
      <PageLayout windowTitle="Project Create">
        <NavBar />
        <Container maxW="container.xl">
          <Heading>Project create</Heading>
          <Formik
            initialValues={
              {
                name: '',
                estimated_when: new Date(),
                started_when: new Date(),
                status: 'NOT SIGNING',
              } as Project
            }
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required'),
              estimated_when: Yup.date().required(),
            })}
            onSubmit={async (values, actions) => {
              if (values.name) {
                await dispatch(createProject(values))
                router.push('/projects')
              }
              actions.setSubmitting(false)
            }}
          >
            {({
              errors,
              touched,
              isSubmitting,
              values,
              setFieldValue,
            }: FormikProps<Partial<Project>>) => (
              <Form>
                <Stack spacing="2">
                  <Field name="name">
                    {({ field }: { field: FieldMetaProps<any> }) => (
                      <FormControl
                        isInvalid={(errors.name && touched.name) || false}
                      >
                        <FormLabel htmlFor="name">Project Name</FormLabel>
                        <Input {...field} id="name" placeholder="name" />
                        <FormErrorMessage>{errors.name}</FormErrorMessage>
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

                  <Field name="status">
                    {({ field }: { field: FieldMetaProps<any> }) => (
                      <FormControl
                        isInvalid={(errors.status && touched.status) || false}
                      >
                        <FormLabel htmlFor="status">Status</FormLabel>
                        <Input {...field} id="status" placeholder="status" />
                        <FormErrorMessage>{errors.status}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="customer_id">
                    {({ field }: { field: FieldMetaProps<any> }) => (
                      <FormControl
                        isInvalid={
                          (errors.customer && touched.customer) || false
                        }
                      >
                        <FormLabel htmlFor="customer_id">
                          Customer name
                        </FormLabel>

                        <Select
                          {...field}
                          id="customer_id"
                          placeholder="Select option"
                          onChange={(e) =>
                            setFieldValue(
                              'customer.customer_id',
                              e.target.value,
                            )
                          }
                        >
                          {customers?.map((customer) => (
                            <option value={customer.customer_id}>
                              {customer.name}
                            </option>
                          ))}
                        </Select>
                        <FormErrorMessage>{errors.customer}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  {/* <Field name="architect">
                    {({ field }: { field: FieldMetaProps<any> }) => (
                      <FormControl
                        isInvalid={
                          (errors.architect && touched.architect) || false
                        }
                      >
                        <FormLabel htmlFor="architect">
                          Architect Name
                        </FormLabel>
                        <Input
                          {...field}
                          id="architect"
                          placeholder="architect"
                        />
                        <FormErrorMessage>{errors.architect}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field> */}
                  <Button
                    mt={4}
                    colorScheme="teal"
                    isLoading={isSubmitting || loading}
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
    )
  }
  return null
}

export default ProjectCreate
