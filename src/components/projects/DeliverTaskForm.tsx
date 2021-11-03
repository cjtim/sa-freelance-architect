import { DeliverTask } from '@/pages/api/entity'
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Select,
  Stack,
} from '@chakra-ui/react'
import { Field, FieldMetaProps, Form, Formik, FormikProps } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { DatePicker } from 'react-rainbow-components'
import { DeliveryState } from '@/pages/api/interface/state'
import router from 'next/router'
import { ExternalLinkIcon } from '@chakra-ui/icons'

interface Props {
  onSubmit: (values: DeliverTask, file?: File) => void
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
}) => {
  const [file, setFile] = useState<File>()

  return (
    <Container maxW="container.xl">
      <Flex>
        <Heading>รายละเอียดงวด การส่งงาน</Heading>
        {initialValues?.file_url && (
          <>
            <Link href={initialValues?.file_url} isExternal mx="4">
              <Button colorScheme="green">
                Download file ของงานงวดนี้ <ExternalLinkIcon mx="2px" />
              </Button>
            </Link>
          </>
        )}
      </Flex>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          due_date: Yup.date().required(),
          status: Yup.string().required(),
        })}
        onSubmit={async (values, actions) => {
          onSubmit(values, file)
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
                  <FormControl
                    isInvalid={(errors.note && touched.note) || false}
                  >
                    <FormLabel htmlFor="note">Note (optional)</FormLabel>
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
                <FormLabel htmlFor="due_date">วันกำหนดส่งงวด *</FormLabel>
                <DatePicker
                  id="due_date"
                  value={values.due_date}
                  onChange={(value) => setFieldValue('due_date', value)}
                  // label="DatePicker Label"
                  formatStyle="large"
                  disabled={isDisable}
                />
                <FormErrorMessage>{errors.due_date}</FormErrorMessage>
              </FormControl>

              {/* Started when */}
              <FormControl
                isInvalid={(errors.actual_date && touched.actual_date) || false}
              >
                <FormLabel htmlFor="actual_date">
                  วันที่ส่งงวดสำเร็จ (optional)
                </FormLabel>
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
                    <FormLabel htmlFor="status">Status *</FormLabel>
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

              {!isDisable && (
                <>
                  <FormLabel>ไฟล์ของงานงวดปัจจุบัน (optional)</FormLabel>
                  <Input
                    type="file"
                    size="md"
                    onChange={(e) =>
                      e.target.files && setFile(e.target.files[0])
                    }
                    mx={4}
                  />
                </>
              )}

              <Flex>
                <Button
                  mt={4}
                  mr={4}
                  colorScheme="red"
                  onClick={() => router.back()}
                  hidden={isDisable}
                >
                  Cancel
                </Button>
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  type="submit"
                  hidden={isDisable}
                >
                  Submit
                </Button>
              </Flex>
            </Stack>
          </Form>
        )}
      </Formik>
    </Container>
  )
}
export default DeliverTaskForm
