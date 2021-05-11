/*
 * @Author: yuze.xia 
 * @Date: 2021-04-29 16:18:31 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-05-11 15:28:08
 */
import React from 'react';

import NavTop from 'component/nav-top/index.jsx';
import NavSide from 'component/nav-side/index.jsx';

import './theme.css';
import './index.less';

class Layout extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div id="wrapper">
                <NavTop />
                <NavSide />
                {this.props.children}
            </div>
        );
    }
}

export default Layout;
