import PageLayout from '@/components/PageLayout'
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { Field, FieldMetaProps, Form, Formik, FormikProps } from 'formik'
import React from 'react'
import * as Yup from 'yup'

interface InputForm {
  name: string
}
const ProjectCreate = () => {
  if (typeof window !== 'undefined') {
    return (
      <PageLayout windowTitle="Project Create">
        <Container maxW="container.xl">
          <Formik
            initialValues={{ name: 'Sasuke' }}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required'),
            })}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2))
                actions.setSubmitting(false)
              }, 1000)
            }}
          >
            {({ errors, touched, isSubmitting }: FormikProps<InputForm>) => (
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
                  isLoading={isSubmitting}
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
