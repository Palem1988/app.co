import React from 'react';
import _ from 'lodash';

import { StyledAppList } from '@components/app-list';
import { Button } from '@components/button';
import { LinkButton } from '@components/link-button';

const getTwitterMentions = (app) => {
  const [ranking] = app.Rankings;
  if (ranking) {
    return ranking.twitterMentions || 0;
  }
  return 0;
};

class AppList extends React.Component {
  constructor(props) {
    super(props);
    const sortedApps = _.sortBy(props.apps, (app) => -getTwitterMentions(app));
    this.state = {
      showCount: props.show,
      showAll: false,
      sortedApps,
    };
  }

  showAll() {
    this.setState({
      showAll: true,
    });
  }

  render() {
    const { showCount, showAll, sortedApps } = this.state;

    const renderRows = () => {
      const visibleApps = showAll ? sortedApps : sortedApps.slice(0, showCount);
      return visibleApps.map((app, index) => (
        <StyledAppList.Row key={app.id}>
          <StyledAppList.Rank>{index + 1}</StyledAppList.Rank>
          <StyledAppList.Icon>
            <StyledAppList.IconImage src="https://blockstack.org/images/logos/app-icon-stealthy-256x256.png" />
          </StyledAppList.Icon>
          <StyledAppList.Name>{app.name}</StyledAppList.Name>
          <StyledAppList.Description>Placeholder for description</StyledAppList.Description>
          <StyledAppList.Category>
            <StyledAppList.CategoryTag>{app.category}</StyledAppList.CategoryTag>
          </StyledAppList.Category>
          <StyledAppList.Description>{getTwitterMentions(app)}</StyledAppList.Description>
        </StyledAppList.Row>
      ));
    };

    if (sortedApps) {
      return (
        <StyledAppList>
          <StyledAppList.Table>
            <tbody>{renderRows()}</tbody>
          </StyledAppList.Table>
          <StyledAppList.Footer>
            <StyledAppList.ExpandButtonWrapper>
              <Button onClick={() => {}} type="button/primary">
                Next 100
              </Button>
            </StyledAppList.ExpandButtonWrapper>
            <LinkButton onClick={() => this.showAll()}>View All</LinkButton>
          </StyledAppList.Footer>
        </StyledAppList>
      );
    }
    return null;
  }
}

export { AppList };
