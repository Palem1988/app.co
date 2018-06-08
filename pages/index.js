import React from 'react';

import { Hero } from '@containers/hero';
import { Header } from '@containers/header';
import { Page } from '@containers/page';
import { Featured } from '@containers/featured';
import AppList from '@containers/app-list';
// import SubmitDappCard from '@containers/cards/submit-dapp-card';
import NewsletterCTA from '@containers/newsletter-cta';

const featuredApps = ['SteemIt', 'Stealthy', 'Peepeth', 'Mastodon', 'Diaspora', 'DTube'];
const bizApps = ['Graphite', 'Aragon', 'Gitcoin', 'Bounty0x', 'adChain Registry', 'ETHLance'];

export default ({ data }) => (
  <Page>
    <Header data={data} />
    <Hero />
    <Page.Section wrap={1}>
      <Page.Section.Content>
        <Featured apps={data.apps} featured={featuredApps} />
        <br />
        <br />
        <Featured apps={data.apps} featured={bizApps} right />
      </Page.Section.Content>
    </Page.Section>

    <Page.Section wrap={1}>
      <Page.Section.Content>
        <AppList show={25} />
      </Page.Section.Content>
      {/*      <Page.Sidebar>
        <SubmitDappCard />
      </Page.Sidebar> */}
    </Page.Section>

    <Page.Section wrap={1}>
      <NewsletterCTA apiServer={data.apiServer} />
    </Page.Section>
  </Page>
);
