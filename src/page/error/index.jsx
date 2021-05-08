/*
 * @Author: yuze.xia 
 * @Date: 2021-05-08 10:50:56 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-05-08 11:03:29
 */

import React from 'react';
import { Link } from 'react-router-dom';

import PageTitle from 'component/page-title/index.jsx';

class Error extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="出错啦~" />
                <div className="row">
                    <div className="col-md-12">
                        <span>找不到该路径</span>
                        <Link to="/">点我返回首页</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Error;
