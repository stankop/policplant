// components/Layout.js
import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

class Layout extends Component {
  render () {
    const { children } = this.props
    return (
    <div>
        {/* <Header />
        <main className="container-fluid layout" style={ isMobile ? { backgroundColor: '#FFF' , width:'100%', margin:0} : { backgroundColor: '#FFF' , width:'85%'}}> */}
        
            
            {children}
            
        {/* </main> */}
        {/* <Footer /> */}
    </div>
    );
  }
}

export default Layout