import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  SkeletonCircle,
  useColorMode,
  Link as ChakraLink,
} from '@chakra-ui/react'
import React from 'react'
import Link from 'next/link'

interface Profile {
  userId: string
  displayName: string
  pictureUrl?: string
  statusMessage?: string
}

export default function NavBar(): JSX.Element {
  const [show, setShow] = React.useState(false)
  const [profile, setProfile] = React.useState<Profile | undefined>(undefined)
  const toggleMenu = () => setShow(!show)
  const { toggleColorMode, colorMode } = useColorMode()

  React.useEffect(() => {
    // fetchProfile().then((data) => setProfile(data))
  }, [])

  return (
    <nav>
      <Flex
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        px={10}
        py={4}
        bg={['primary.500', 'primary.500', 'transparent', 'transparent']}
      >
        <Flex align="center">
          <Link href="/">
            <Image src="/vercel.svg" boxSize="3rem" />
          </Link>
        </Flex>

        <Box display={{ base: 'block', md: 'none' }} onClick={toggleMenu}>
          <HamburgerIcon />
        </Box>

        <Box
          display={{ base: show ? 'block' : 'none', md: 'block' }}
          flexBasis={{ base: '100%', md: 'auto' }}
        >
          <Flex
            align={['center', 'center', 'center', 'center']}
            justify={['center', 'space-between', 'flex-end', 'flex-end']}
            direction={['column', 'row', 'row', 'row']}
            pt={[4, 4, 0, 0]}
          >
            <SimpleGrid columns={5} spacing={2}>
              <Link href="/dashboard/linegrouplist">
                <Button>Line Group </Button>
              </Link>
              <Link href="/dashboard/transaction">
                <Button>Transaction</Button>
              </Link>
              <Link href="/dashboard/summary">
                <Button>Summary</Button>
              </Link>
              <ChakraLink href="https://ex10.tech/manager/chat" target="_blank">
                <Button>Line Chat</Button>
              </ChakraLink>
              <Button onClick={toggleColorMode}>
                {colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
              </Button>
            </SimpleGrid>
            <Menu>
              <MenuButton as={Box} px={3} py={2}>
                {profile && (
                  <Image
                    src={profile.pictureUrl}
                    boxSize="3rem"
                    rounded="50%"
                  />
                )}
                {!profile && <SkeletonCircle size="12" isLoaded={false} />}
              </MenuButton>
              <MenuList>
                <Link href="/logout">
                  <MenuItem textDecoration="none">Logout</MenuItem>
                </Link>
              </MenuList>
            </Menu>
          </Flex>
        </Box>
      </Flex>
      <Divider />
    </nav>
  )
}
