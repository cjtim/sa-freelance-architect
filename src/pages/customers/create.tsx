import NavBar from '@/components/NavBar'
import PageLayout from '@/components/PageLayout'
import { createCustomer } from '@/slices/customer'
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
import { Customer } from '../api/entity'

const CustomerCreate = () => {
  const { loading } = useAppSelector((state) => state.customers)
  const dispatch = useAppDispatch()
  if (typeof window !== 'undefined') {
    return (
      <PageLayout windowTitle="Project Create">
        <NavBar />
        <Container maxW="container.xl">
          <Heading>Customer create</Heading>
          <Formik
            initialValues={{ name: '', phone: '' } as Customer}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required'),
              phone: Yup.string().min(10).max(10).required('Required'),
            })}
            onSubmit={async (values, actions) => {
              await dispatch(
                createCustomer({
                  name: values.name,
                  phone: values.phone,
                }),
              )
              router.push('/customers')

              actions.setSubmitting(false)
            }}
          >
            {({
              errors,
              touched,
              isSubmitting,
            }: FormikProps<Partial<Customer>>) => (
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
                <Field name="phone">
                  {({ field }: { field: FieldMetaProps<any> }) => (
                    <FormControl
                      isInvalid={(errors.phone && touched.phone) || false}
                    >
                      <FormLabel htmlFor="phone">Phone Number</FormLabel>
                      <Input {...field} id="phone" placeholder="phone" />
                      <FormErrorMessage>{errors.phone}</FormErrorMessage>
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

export default CustomerCreate
