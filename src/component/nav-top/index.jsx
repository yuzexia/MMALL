/*
 * @Author: yuze.xia 
 * @Date: 2021-04-29 16:37:16 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-04-29 17:18:33
 */
import React from 'react';
import {Link} from 'react-router-dom';

class NavTop extends React.Component{
    render() {
        return (
            <div className="navbar navbar-default top-navbar" role="navigation">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/"><b>H</b>MMAL</Link>
                </div>
                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" href="javascript:;">
                            <i className="fa fa-user fa-fw"></i> 
                            <span>欢迎，admin</span>
                            <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li>
                                <a href="#">
                                    <i className="fa fa-sign-out fa-fw"></i>
                                    <span>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    
                </ul>
            </div>
        )
    }
}

export default NavTop;
