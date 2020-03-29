import React from 'react';
import styled from 'styled-components';
import { appColor, headerHeight } from 'modules/theme';

import { Container, utils } from 'styled-minimal';
import { Link } from 'react-router-dom';
import path from '../routes';

import './style/Header.scss';

const { spacer } = utils;

const HeaderWrapper = styled.header`
  background-color: #113740;
  height: ${headerHeight}px;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 200;

  &:before {
    background-color: ${appColor};
    bottom: 0;
    content: '';
    height: 0.2rem;
    left: 0;
    position: absolute;
    right: 0;
  }
`;

const HeaderContainer = styled(Container)`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  justify-content: space-between;
  padding-bottom: ${spacer(2)};
  padding-top: ${spacer(2)};
`;

const HeaderLink = styled(Link)`
  color: white;
`;

export default class Header extends React.PureComponent {
  render() {
    return (
      <HeaderWrapper>
        <HeaderContainer>
          <HeaderLink to={path.home}>Home</HeaderLink>
          <HeaderLink to={path.history}>History</HeaderLink>
        </HeaderContainer>
      </HeaderWrapper>
    );
  }
}
