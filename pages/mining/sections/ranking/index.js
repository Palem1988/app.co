import React from 'react'
import { Flex, Box, Type } from 'blockstack-ui'
import { Title, Wrapper, Section, Logo, AppItem } from '@pages/mining/shared'
import { Dots, DotsLine, DemoEarthLogo, ProductHuntLogo } from '@components/mining/svg'

const texts = [
  'Any app on App.co with Blockstack auth or storage can be ranked.',
  'Expert reviewers use their proprietary data to evaluate apps.',
  'Reviewers, criteria, and rankings are made public each month.'
]

const TextSection = ({ ...rest }) => (
  <Flex lineHeight={1.6} justifyContent="space-between" flexWrap="wrap">
    {texts.map((text, i) => (
      <Box key={i} pt={7} width={['100%', '28%']}>
        <Box bg="blue.accent" height={'1px'} width={80} />
        <Type pt={6} color="white">
          {text}
        </Type>
      </Box>
    ))}
  </Flex>
)

const Ranker = ({ logo: Logo, children, color, ...rest }) => (
  <Box
    overflow="hidden"
    ml={5}
    bg="#081537"
    width={[1, 1, 1, 'auto']}
    border={1}
    borderColor={color}
    pl={4}
    pr={[4, 4, 4, 7]}
    pt={4}
    pb={7}
    mt={[4, 4, 4, 0]}
    position="relative"
    zIndex={5}
    textAlign={['center', 'center', 'left']}
    {...rest}
  >
    {Logo ? (
      <Box pb={4} pt={3}>
        <Logo />
      </Box>
    ) : null}
    <Type color={color}>{children}</Type>
    <Flex position="absolute" bottom="-3px" left={0}>
      <Box>
        <Dots color={color} />
      </Box>
      <Box ml={'3px'}>
        <Dots color={color} />
      </Box>
      <Box ml={'3px'}>
        <Dots color={color} />
      </Box>
    </Flex>
  </Box>
)

const RankingSection = ({ apps, ...rest }) => (
  <Section bg="blue.dark" {...rest}>
    <Wrapper flexDirection="column">
      <Flex width={1} flexShrink={1} flexDirection="column">
        <Title maxWidth={'100%'}>Apps are ranked by expert reviewers</Title>
        <Type pt={5} color="white">
          Rankings are combined and payouts sent every 30 days
        </Type>
      </Flex>
      <Flex
        width={1}
        alignItems="center"
        justifyContent="center"
        flexGrow={1}
        flexDirection="column"
        position="relative"
        pt={7}
      >
        <Box width={1}>
          <Flex color={'blue.dark'} alignItems="center" bg="white" p={6}>
            <Flex alignItems="center">
              <Type mr={4} fontSize={4} fontFamily="brand">
                1
              </Type>
              <Box mr={4} size={72} border={1} borderColor="blue.dark" borderRadius={16} />
            </Flex>
            <Flex ml="auto">
              <Type fontSize={5} fontWeight={300} fontFamily="brand">
                Payout this month: $100,000
              </Type>
            </Flex>
          </Flex>
          <Flex
            overflow="hidden"
            flexWrap="wrap"
            lineHeight={1.5}
            p={6}
            bg="#081537"
            position="relative"
            pl={[5, 5, 5, 7]}
            pr={6}
          >
            <Ranker logo={ProductHuntLogo} mt={0} color={'#EF6F70'}>
              Ranks with Product Hunt
              <br /> community upvotes and activity.
            </Ranker>
            <Ranker logo={DemoEarthLogo} color={'#1ADAD9'}>
              Ranks by polling the Blockstack
              <br /> investor community.
            </Ranker>
            <Box left={[25, 25, 25, 35]} top={0} position="absolute">
              <DotsLine />
            </Box>
          </Flex>
        </Box>

        <TextSection />
      </Flex>
    </Wrapper>
  </Section>
)

export { RankingSection }
