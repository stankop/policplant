import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
//import { NavLink } from 'react-router-dom';
import  Search  from '../Search'
//import 'bootstrap/dist/css/bootstrap.min.css';

const setSearchValue = () => {

}
const Sidebar = () => {
  // const cdbreact = require('cdbreact');  
  // const { CDBSidebar,
  //   CDBSidebarContent,CDBSidebarHeader, } = cdbreact;
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Pretraga
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <Search onSearch={ setSearchValue}></Search>
        </CDBSidebarContent>

       
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;