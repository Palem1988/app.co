import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Flex, Box, Type } from 'blockstack-ui'
import { connect } from 'react-redux'
import isNaN from 'lodash/isNaN'

import { selectMaker, selectAppList, selectCurrentApp, selectCompetionStatus } from '@stores/maker/selectors'
import { fetchApps, selectAppAction } from '@stores/maker/actions'
import { selectApiServer, selectUser } from '@stores/apps/selectors'
import { MakerContainer, MakerContentBox, MakerStickyStatusBox } from '@components/maker/styled'
import { Page } from '@components/page'
import Head from '@containers/head'
import Maker from '@components/maker'

const MakerPortal = ({ params, apiServer, user, maker, errorMessage, appList, selectedApp, competionStatus, dispatch }) => {

  const hasAppId = params && !!params.appId

  const router = useRouter()

  const updateMakerRoute = id => router.push(
    '/maker/apps',
    `/maker/apps/${id}`,
    {
      shallow: true
    }
  )

  const getAppId = () => {
    if (!params) return undefined
    const id = parseInt(params.appId, 10)
    if (isNaN(id)) return undefined
    return id
  }

  useEffect(() => {
    async function fetchAppsOnInit () {
      await fetchApps({ apiServer, user })(dispatch)
      if (hasAppId) {
        dispatch(selectAppAction(getAppId()))
      }
      if (!hasAppId && process.browser) {
        setTimeout(() => {
          console.log(appList)
          const { id } = appList[0]
          dispatch(selectAppAction(id))
        })
      }
    }
    fetchAppsOnInit()
  }, [])

  if (maker.loading || !selectedApp) {
    return (
      <Page innerPadding={0} wrap>
        <Flex>
          <Box width={1}>
            <Type fontSize={5} my={7} textAlign="center">{maker.loading ? 'Loading...' : errorMessage}</Type>
          </Box>
        </Flex>
      </Page>
    )
  }

  function handleChangingApp (event) {
    event.persist()
    const id = event.target.value
    dispatch(selectAppAction(id))
    updateMakerRoute(id)
  }

  return (
    <Page innerPadding={0} wrap>
      <Head title={selectedApp.name} />
      <MakerContainer>
        <Box>
        {
          appList.length &&
            <select onChange={handleChangingApp} value={getAppId()}>
              {appList.map(({ name, id }) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </select>
        }
        </Box>
        <Type fontSize={3} fontWeight={500} mx={[4, 6]} py={6} px={[20, 0]}>
          {selectedApp.name}
        </Type>
        <Flex flexDirection={['column', 'column', 'row-reverse']} maxWidth={[null, null, 1140]} alignItems="flex-start">
          <MakerStickyStatusBox>
            <Maker.Status
              app={selectedApp}
              apiServer={apiServer}
              status={competionStatus}
            />
          </MakerStickyStatusBox>
          <Box>
            <MakerContentBox>
              <Maker.PaymentDetails
                app={selectedApp}
                user={user}
                apiServer={apiServer}
                dispatch={dispatch}
              />
            </MakerContentBox>
            <MakerContentBox>
              <Maker.KYC
                app={selectedApp}
                user={user}
                apiServer={apiServer}
              />
            </MakerContentBox>
            <MakerContentBox>
              <Maker.ParticipationAgreement
                app={selectedApp}
                user={user}
                apiServer={apiServer}
              />
            </MakerContentBox>
          </Box>
        </Flex>
      </MakerContainer>
    </Page>
  )
}

MakerPortal.getInitialProps = (x) => {
  console.log(x.userApps)
  return { params: x.query.params }
}

const mapStateToProps = state => ({
  user: selectUser(state),
  apiServer: selectApiServer(state),
  maker: selectMaker(state),
  appList: selectAppList(state),
  selectedApp: selectCurrentApp(state),
  competionStatus: selectCompetionStatus(state)
})

export default connect(mapStateToProps)(MakerPortal)