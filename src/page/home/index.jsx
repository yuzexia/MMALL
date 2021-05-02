/*
 * @Author: yuze.xia 
 * @Date: 2021-04-29 15:12:41 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-05-02 14:51:42
 */
import React from 'react';

import PageTitle from 'component/page-title/index.jsx';

import './index.css';

class Home extends React.Component{
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="首页"/>
            </div>
        );
    }
}

export default Home;
