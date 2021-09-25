import NavBar from '@/components/NavBar'
import PageLayout from '@/components/PageLayout'
import { getLineUid } from '@/lib/axios'
import { Project } from '@/pages/api/entity/project'
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
} from '@chakra-ui/react'
import { Field, FieldMetaProps, Form, Formik, FormikProps } from 'formik'
import router from 'next/router'
import React from 'react'
import * as Yup from 'yup'

const ProjectCreate = () => {
  const { loading } = useAppSelector((state) => state.projects)
  const dispatch = useAppDispatch()
  if (typeof window !== 'undefined') {
    return (
      <PageLayout windowTitle="Project Create">
        <NavBar />
        <Container maxW="container.xl">
          <Heading>Project create</Heading>
          <Formik
            initialValues={{ name: '' }}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required'),
            })}
            onSubmit={async (values, actions) => {
              if (values.name) {
                await dispatch(
                  createProject({
                    name: values.name,
                    lineUid: await getLineUid(),
                  }),
                )
                router.push('/projects')
              }
              actions.setSubmitting(false)
            }}
          >
            {({
              errors,
              touched,
              isSubmitting,
            }: FormikProps<Partial<Project>>) => (
              <Form>
                <Field name="name">
                  {({ field }: { field: FieldMetaProps<any> }) => (
                    <FormControl
                      isInvalid={(errors.name && touched.name) || false}
                    >
                      <FormLabel htmlFor="name">First name</FormLabel>
                      <Input {...field} id="name" placeholder="name" />
                      <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={isSubmitting || loading}
                  type="submit"
                >
                  Submit
                </Button>
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
