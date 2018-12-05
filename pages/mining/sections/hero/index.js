import React from 'react'
import { Flex, Box, Type } from 'blockstack-ui'
import { BitcoinIcon } from 'mdi-react'
import { Title, Wrapper, Section, Logo, AppItem } from '@pages/mining/shared'
import { ArrowIcon } from '@components/mining/svg'
import { Hover } from 'react-powerplug'


const Apps = ({ apps, ...rest }) => (
  <Box position="relative" width={1} {...rest}>
    {apps.map((item, i) => (i < 4 ? <AppItem app={item} key={1 + i} index={1 + i} length={4} /> : null))}
  </Box>
)

const Time = ({ ...rest }) => (
  <>
    <Type fontWeight="bolder">22D</Type> : <Type fontWeight="bolder">11H</Type> : <Type fontWeight="bolder">05M</Type>
  </>
)

const CallToAction = ({ ...rest }) => (
  <Hover>
    {({ hovered, bind }) => (
      <Box transform={hovered ? 'translateY(-5px)' : 'unset'} transition={'0.1s all ease-in-out'} {...rest}>
        <Flex
          bg={hovered ? 'white' : 'blue.accent'}
          alignItems="center"
          justifyContent="center"
          p={5}
          color={hovered ? 'blue' : 'blue.dark'}
          cursor={hovered ? 'pointer' : 'unset'}
          transition="0.1s all ease-in-out"
          {...bind}
        >
          <Type fontWeight={400} fontSize={[3, 4]}>
            Get your App Mining Starter Kit
          </Type>
          <Box pl={2} pt={1}>
            <ArrowIcon strokeWidth={1.5} />
          </Box>
        </Flex>

        <Flex bg="#081537" alignItems="center" justifyContent="center" p={4}>
          <Type color="white" fontWeight={400} fontSize={2}>
            Next ranking starts in <Time />
          </Type>
        </Flex>
      </Box>
    )}
  </Hover>
)

const SubtitleBTC = ({ ...rest }) => (
  <Flex alignItems={'center'} color={'blue.accent'} {...rest}>
    <Flex
      alignItems={'center'}
      justifyContent={'center'}
      size={48}
      borderColor="blue.accent"
      border={1}
      borderRadius={80}
    >
      <BitcoinIcon />
    </Flex>
    <Type fontFamily={'brand'} pl={4} lineHeight={1.55}>
      The better your app,
      <br />
      the more Bitcoin you earn.
    </Type>
  </Flex>
)

const LearnMore = ({ ...rest }) => (
  <Flex
    display={['none', 'none', 'flex']}
    position={['absolute']}
    pt={8}
    pb={8}
    bottom={['-180px', '-100px']}
    {...rest}
  >
    <Type color="white">Learn how to win</Type>
  </Flex>
)

const Hero = ({ apps, ...rest }) => (
  <Section bg="blue.dark" {...rest}>
    <Wrapper>
      <Flex width={[1, 1, 0.5, 0.6]} flexShrink={1} flexDirection="column">
        <Logo pb={7} />
        <Title>Every 30 days we&nbsp;payout $100k to the best apps.</Title>
        <SubtitleBTC pt={7} />
      </Flex>
      <Flex
        pl={[0, 0, 8, 0]}
        alignItems="center"
        justifyContent="center"
        pt={[7, 7, 0, 0]}
        flexGrow={1}
        flexDirection="column"
        position="relative"
      >
        <CallToAction width={1} />
        <Apps apps={apps} mt={7} />
        <LearnMore />
      </Flex>
    </Wrapper>
  </Section>
)

export { Hero }
