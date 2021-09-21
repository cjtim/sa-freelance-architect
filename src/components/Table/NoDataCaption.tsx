import {
  Icon,
  TableCaption,
  TableCaptionProps,
  Text,
  VStack,
} from '@chakra-ui/react'
import { ImFilesEmpty } from 'react-icons/im'

const NoDataCaption: React.FC<TableCaptionProps> = ({ children, ...rest }) => (
  <TableCaption justifyContent="center" my="2" placement="bottom" {...rest}>
    <VStack spacing={2}>
      {children ?? (
        <>
          <Icon as={ImFilesEmpty} fontSize="4xl" />
          <Text>No Data</Text>
        </>
      )}
    </VStack>
  </TableCaption>
)
export default NoDataCaption
