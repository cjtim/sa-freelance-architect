import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SkeletonCircle,
  useColorMode,
  MenuGroup,
  IconButton,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import NextLink from 'next/link'
import { BsHouseFill } from 'react-icons/bs'

interface Profile {
  userId: string
  displayName: string
  pictureUrl?: string
  statusMessage?: string
}

export default function NavBar(): JSX.Element {
  const [show, setShow] = useState(false)
  const [profile, setProfile] = useState<Profile | undefined>(undefined)
  const toggleMenu = () => setShow(!show)
  const { toggleColorMode, colorMode } = useColorMode()

  const fetchProfile = React.useCallback(async () => {
    const liff = (await import('@line/liff')).default
    await liff.ready
    const profile = await liff.getProfile()
    setProfile(profile)
  }, [])

  React.useEffect(() => {
    if (profile === undefined) fetchProfile()
  }, [profile])

  return React.useMemo(
    () => (
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
          <Link href="/" as={NextLink}>
            <IconButton
              aria-label="Home"
              icon={<BsHouseFill />}
              fontSize="3xl"
              bgColor="transparent"
            />
          </Link>

          <Box display={{ base: 'block', md: 'none' }}>
            <IconButton
              aria-label="Search database"
              icon={<HamburgerIcon />}
              onClick={() => toggleMenu()}
            />
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
              <Link href="/projects" as={NextLink}>
                <Button mx={2}>Projects</Button>
              </Link>
              <Link href="/customers" as={NextLink}>
                <Button mx={2}>Customers</Button>
              </Link>
              <Link href="/furnitures" as={NextLink}>
                <Button mx={2}>Furnitures</Button>
              </Link>
              {/* <Link href="/liff/urls" p={2}>
              <Button>My Urls</Button>
            </Link>
            <Link href="/liff/binance" p={2}>
              <Button>Profit Tracker</Button>
            </Link> */}
              <Button onClick={() => toggleColorMode()} p={2}>
                {colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
              </Button>

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
                  <MenuGroup title={profile?.displayName || 'Profile'}>
                    <Link href="/logout" textDecoration="none">
                      <MenuItem textDecoration="none">Logout</MenuItem>
                    </Link>
                  </MenuGroup>
                </MenuList>
              </Menu>
            </Flex>
          </Box>
        </Flex>
        <Divider />
      </nav>
    ),
    [profile, colorMode, show],
  )
}
