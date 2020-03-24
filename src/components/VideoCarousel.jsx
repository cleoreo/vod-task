import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import treeChanges from 'tree-changes';
import { appColor } from 'modules/theme';

import { getRepos, showAlert, switchMenu } from 'actions';
import { STATUS } from 'constants/index';

import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Image,
  Link,
  Paragraph,
  theme,
  utils,
} from 'styled-minimal';
import Loader from 'components/Loader';

const { responsive, spacer } = utils;
const { grays } = theme;

const GitHubGrid = styled.ul`
  display: grid;
  grid-auto-flow: row;
  grid-gap: ${spacer(2)};
  grid-template-columns: 100%;
  list-style: none;
  margin: ${spacer(4)} auto 0;
  padding: 0;
  /* stylelint-disable */
  ${/* istanbul ignore next */ p =>
    responsive({
      ix: `
        grid-gap: ${spacer(3)(p)};
        width: 90%;
      `,
      md: `
        grid-template-columns: repeat(2, 1fr);
        width: 100%;
      `,
      lg: `
        grid-template-columns: repeat(3, 1fr);
      `,
      xl: `
        grid-gap: ${spacer(4)(p)};
        grid-template-columns: repeat(4, 1fr);
      `,
    })};
  /* stylelint-enable */

  > li {
    display: flex;
  }
`;

const Item = styled(Link)`
  align-items: center;
  border: solid 0.1rem ${appColor};
  border-radius: 0.4rem;
  overflow: hidden;
  padding: ${spacer(3)};
  text-align: center;
  width: 100%;
  /* stylelint-disable */
  ${/* istanbul ignore next */ p =>
    responsive({
      md: `
        padding: ${spacer(3)(p)};
      `,
      lg: `
        padding: ${spacer(4)(p)};
      `,
    })};
  /* stylelint-enable */

  p {
    color: #000;
  }

  img {
    height: 8rem;
    margin-bottom: ${spacer(2)};
  }
`;

const ItemHeader = styled.div`
  margin-bottom: ${spacer(3)};

  small {
    color: ${grays.gray60};
  }
`;

export class VideoCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: 'react',
    };
  }

  static propTypes = {
    getGHRepos: PropTypes.func.isRequired,
    github: PropTypes.object.isRequired,
    showLoginAlert: PropTypes.func.isRequired,
    switchGHMenu: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { query } = this.state;
    const { getGHRepos } = this.props;

    getGHRepos(query);
  }

  componentDidUpdate(prevProps) {
    const { github, showLoginAlert } = this.props;
    const { changedTo } = treeChanges(prevProps, this.props);

    if (changedTo('github.repos.status', STATUS.ERROR)) {
      showLoginAlert(github.repos.message, { variant: 'danger' });
    }
  }

  handleClick = e => {
    const { query } = e.currentTarget.dataset;

    this.setState({
      query,
    });

    const { switchGHMenu } = this.props;
    switchGHMenu(query);
  };

  render() {
    const { query } = this.state;
    const { github } = this.props;
    const data = github.repos.data[query] || [];
    let output;

    if (github.repos.status === STATUS.SUCCESS) {
      if (data.length) {
        output = (
          <GitHubGrid data-type={query} data-testid="GitHubGrid">
            {github.repos.data[query].map(d => (
              <li key={d.id}>
                <Item href={d.html_url} target="_blank">
                  <Image src={d.owner.avatar_url} alt={d.owner.login} />
                  <ItemHeader>
                    <Heading as="h5" lineHeight={1}>
                      {d.name}
                    </Heading>
                    <small>{d.owner.login}</small>
                  </ItemHeader>
                  <Paragraph>{d.description}</Paragraph>
                </Item>
              </li>
            ))}
          </GitHubGrid>
        );
      } else {
        output = <h3>Nothing found</h3>;
      }
    } else {
      output = <Loader block />;
    }

    return (
      <div key="GitHub" data-testid="GitHubWrapper">
        <Flex justifyContent="center">
          <ButtonGroup role="group" aria-label="GitHub Selector" data-testid="GitHubSelector">
            <Button
              animate={query === 'react' && github.repos.status === 'running'}
              bordered={query !== 'react'}
              size="lg"
              data-query="react"
              onClick={this.handleClick}
            >
              React
            </Button>
            <Button
              animate={query === 'redux' && github.repos.status === 'running'}
              bordered={query !== 'redux'}
              size="lg"
              data-query="redux"
              onClick={this.handleClick}
            >
              Redux
            </Button>
          </ButtonGroup>
        </Flex>
        {output}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { video: state.video };
}

const mapDispatchToProps = dispatch => ({
  switchGHMenu: query => dispatch(switchMenu(query)),
  getGHRepos: query => dispatch(getRepos(query)),
  showLoginAlert: (messages, params) => dispatch(showAlert(messages, params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VideoCarousel);