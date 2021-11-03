import { DeliverTask } from '@/pages/api/entity'
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
import React from 'react'
import * as Yup from 'yup'
import { DatePicker } from 'react-rainbow-components'
import { DeliveryState } from '@/pages/api/interface/state'

interface Props {
  onSubmit: (values: DeliverTask) => void
  initialValues?: DeliverTask
  isDisable?: boolean
}

const DeliverTaskForm: React.FC<Props> = ({
  onSubmit,
  initialValues = {
    note: '',
    due_date: new Date(),
    status: DeliveryState.WAIT_FOR_REVIEW,
  } as DeliverTask,
  isDisable = false,
}) => (
  <Container maxW="container.xl">
    <Heading>ข้อมูลการส่งงาน</Heading>
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        due_date: Yup.date().required(),
        status: Yup.string().required(),
      })}
      onSubmit={async (values, actions) => {
        onSubmit(values)
        actions.setSubmitting(false)
      }}
    >
      {({
        errors,
        touched,
        isSubmitting,
        values,
        setFieldValue,
      }: FormikProps<DeliverTask>) => (
        <Form>
          <Stack spacing="2">
            <Field name="note">
              {({ field }: { field: FieldMetaProps<any> }) => (
                <FormControl isInvalid={(errors.note && touched.note) || false}>
                  <FormLabel htmlFor="note">note</FormLabel>
                  <Input
                    {...field}
                    id="note"
                    placeholder="note"
                    isDisabled={isDisable}
                  />
                  <FormErrorMessage>{errors.note}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <FormControl isInvalid={!!(errors.due_date && touched.due_date)}>
              <FormLabel htmlFor="due_date">due_date</FormLabel>
              <DatePicker
                id="due_date"
                value={values.due_date}
                onChange={(value) => setFieldValue('due_date', value)}
                // label="DatePicker Label"
                formatStyle="large"
                required
                disabled={isDisable}
              />
              <FormErrorMessage>{errors.due_date}</FormErrorMessage>
            </FormControl>

            {/* Started when */}
            <FormControl
              isInvalid={(errors.actual_date && touched.actual_date) || false}
            >
              <FormLabel htmlFor="actual_date">actual_date</FormLabel>
              <DatePicker
                id="actual_date"
                value={values.actual_date}
                onChange={(value) => setFieldValue('actual_date', value)}
                // label="DatePicker Label"
                formatStyle="large"
                disabled={isDisable}
              />
              <FormErrorMessage>{errors.actual_date}</FormErrorMessage>
            </FormControl>

            <Field name="status">
              {({ field }: { field: FieldMetaProps<any> }) => (
                <FormControl
                  isInvalid={(errors.status && touched.status) || false}
                >
                  <FormLabel htmlFor="status">Status</FormLabel>
                  <Select
                    {...field}
                    id="status"
                    placeholder="Select option"
                    isDisabled={isDisable}
                  >
                    {Object.values(DeliveryState).map((state) => (
                      <option value={state} key={state}>
                        {state}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>{errors.status}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Button
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
              hidden={isDisable}
            >
              Submit
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  </Container>
)

export default DeliverTaskForm
