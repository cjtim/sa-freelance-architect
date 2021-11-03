import { Customer, Project } from '@/pages/api/entity'
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
} from '@chakra-ui/react'
import { Field, FieldMetaProps, Form, Formik, FormikProps } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import { DatePicker } from 'react-rainbow-components'
import { ProjectState } from '@/pages/api/interface/state'
import router from 'next/router'

interface Props {
  onSubmit: (values: Project) => Promise<void>
  customers: Customer[]
  initialValues?: Project
  isDisable?: boolean
}

const ProjectForm: React.FC<Props> = ({
  onSubmit,
  customers,
  initialValues = {
    name: '',
    estimated_when: new Date(),
    started_when: new Date(),
    status: ProjectState.NEW,
    customer: undefined,
  } as Project,
}) => (
  <Formik
    initialValues={initialValues}
    validationSchema={Yup.object().shape({
      name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      estimated_when: Yup.date().required(),
      status: Yup.string().required(),
    })}
    onSubmit={async (values, actions) => {
      await onSubmit(values)
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
              <FormControl isInvalid={(errors.name && touched.name) || false}>
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
            <FormLabel htmlFor="estimated_when">estimated_when</FormLabel>
            <DatePicker
              id="estimated_when"
              value={values.estimated_when}
              onChange={(value) => setFieldValue('estimated_when', value)}
              // label="DatePicker Label"
              formatStyle="large"
            />
            <FormErrorMessage>{errors.estimated_when}</FormErrorMessage>
          </FormControl>

          {/* Started when */}
          <FormControl
            isInvalid={(errors.started_when && touched.started_when) || false}
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
                <Select {...field} id="status" placeholder="Select option">
                  {Object.values(ProjectState).map((state) => (
                    <option value={state} key={state}>
                      {state}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.status}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="customer.customer_id">
            {({ field }: { field: FieldMetaProps<any> }) => (
              <FormControl
                isInvalid={(errors.customer && touched.customer) || false}
              >
                <FormLabel htmlFor="customer.customer_id">
                  Customer name
                </FormLabel>
                <Select
                  {...field}
                  id="customer.customer_id"
                  placeholder="Select option"
                  onChange={(e) =>
                    setFieldValue('customer.customer_id', e.target.value)
                  }
                >
                  {customers?.map((customer) => (
                    <option
                      value={customer.customer_id}
                      key={customer.customer_id}
                    >
                      {customer.name}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.customer}</FormErrorMessage>
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
)

export default ProjectForm
