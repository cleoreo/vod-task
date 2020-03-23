import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { appColor } from 'modules/theme';

import { Link, theme, utils } from 'styled-minimal';
import Loader from 'components/Loader';
import { getVideoList, showAlert } from '../actions';

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

export class GitHub extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      video: props.video,
    };
  }

  static propTypes = {
    getVideoList: PropTypes.func.isRequired,
    showLoginAlert: PropTypes.func.isRequired,
    video: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { getVideoList } = this.props;
    getVideoList();
  }

  render() {
    return (
      <div key="GitHub" data-testid="GitHubWrapper">
        <Loader block />
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { video: state.video };
}

const mapDispatchToProps = dispatch => ({
  getVideoList: () => dispatch(getVideoList()),
  showLoginAlert: (messages, params) => dispatch(showAlert(messages, params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GitHub);
