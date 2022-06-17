import React from 'react';

//import Sidebar from '../Sidebar';
import MenuBar from '../MenuBar';

import * as s from './styled';

import GlobalStyles from '../../styles/global';

const Layout: React.FC = ({ children }) => (
  <s.LayoutWrapper>
    <GlobalStyles />
    <MenuBar />
    <s.LayoutMain>{children}</s.LayoutMain>
  </s.LayoutWrapper>
);

export default Layout;
