import NavBar from '@/components/NavBar'
import PageLayout from '@/components/PageLayout'
import { createFurniture } from '@/slices/funiture'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import {
  Button,
  Container,
  HStack,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Flex,
} from '@chakra-ui/react'
import { Field, FieldMetaProps, Form, Formik, FormikProps } from 'formik'
import router from 'next/router'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { Furniture } from '../api/entity'

const FurnitureCreate = () => {
  const dispatch = useAppDispatch()
  const [file, setFile] = useState<File>()
  const { loading } = useAppSelector((state) => state.furnitures)

  return (
    <PageLayout windowTitle="Furnitures Create">
      <NavBar />
      <Container maxW="container.xl">
        <Heading>Furnitures create</Heading>
        <Formik
          initialValues={
            {
              furniture_name: '',
            } as Furniture
          }
          validationSchema={Yup.object().shape({
            furniture_name: Yup.string()
              .min(2, 'Too Short!')
              .max(200, 'Too Long!')
              .required('Required'),
            height: Yup.number().required(),
            length: Yup.number().required(),
            width: Yup.number().required(),
            weight: Yup.number().required(),
            price_per_unit: Yup.number().required(),
          })}
          onSubmit={async (values, actions) => {
            if (!file) {
              actions.setErrors({ img: 'Please insert file' })
              actions.setFieldError('img', 'Please insert file')
            }
            if (values.furniture_name && file) {
              await dispatch(
                createFurniture({ furniture: { ...values }, file }),
              )
              router.push('/furnitures')
            }
            actions.setSubmitting(false)
          }}
        >
          {({
            errors,
            touched,
            isSubmitting,
          }: FormikProps<Partial<Furniture>>) => (
            <Form>
              <Stack spacing="2">
                <Field name="furniture_name">
                  {({ field }: { field: FieldMetaProps<any> }) => (
                    <FormControl
                      isInvalid={
                        (errors.furniture_name && touched.furniture_name) ||
                        false
                      }
                    >
                      <FormLabel htmlFor="furniture_name">
                        furniture_name
                      </FormLabel>
                      <Input
                        {...field}
                        id="furniture_name"
                        placeholder="furniture_name"
                      />
                      <FormErrorMessage>
                        {errors.furniture_name}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <HStack spacing="2">
                  <Field name="height">
                    {({ field }: { field: FieldMetaProps<any> }) => (
                      <FormControl
                        isInvalid={(errors.height && touched.height) || false}
                      >
                        <FormLabel htmlFor="height">height</FormLabel>
                        <Input {...field} id="height" placeholder="height" />
                        <FormErrorMessage>{errors.height}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="length">
                    {({ field }: { field: FieldMetaProps<any> }) => (
                      <FormControl
                        isInvalid={(errors.length && touched.length) || false}
                      >
                        <FormLabel htmlFor="length">length</FormLabel>
                        <Input {...field} id="length" placeholder="length" />
                        <FormErrorMessage>{errors.length}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="width">
                    {({ field }: { field: FieldMetaProps<any> }) => (
                      <FormControl
                        isInvalid={(errors.width && touched.width) || false}
                      >
                        <FormLabel htmlFor="width">width</FormLabel>
                        <Input {...field} id="width" placeholder="width" />
                        <FormErrorMessage>{errors.width}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </HStack>
                <Field name="weight">
                  {({ field }: { field: FieldMetaProps<any> }) => (
                    <FormControl
                      isInvalid={(errors.weight && touched.weight) || false}
                    >
                      <FormLabel htmlFor="weight">weight</FormLabel>
                      <Input {...field} id="weight" placeholder="weight" />
                      <FormErrorMessage>{errors.weight}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="price_per_unit">
                  {({ field }: { field: FieldMetaProps<any> }) => (
                    <FormControl
                      isInvalid={
                        (errors.price_per_unit && touched.price_per_unit) ||
                        false
                      }
                    >
                      <FormLabel htmlFor="price_per_unit">
                        price_per_unit
                      </FormLabel>
                      <Input
                        {...field}
                        id="price_per_unit"
                        placeholder="price_per_unit"
                      />
                      <FormErrorMessage>
                        {errors.price_per_unit}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <FormControl isInvalid={(errors.img && touched.img) || false}>
                  <FormLabel>Image</FormLabel>
                  <Input
                    type="file"
                    size="md"
                    onChange={(e) =>
                      e.target.files && setFile(e.target.files[0])
                    }
                    mx={4}
                  />
                  <FormErrorMessage>{errors.img}</FormErrorMessage>
                </FormControl>

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
                    isLoading={isSubmitting || loading}
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
  )
}

export default FurnitureCreate
