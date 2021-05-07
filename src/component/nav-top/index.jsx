/*
 * @Author: yuze.xia 
 * @Date: 2021-04-29 16:37:16 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-05-07 17:33:13
 */
import React from 'react';
import {Link} from 'react-router-dom';

import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';

const _mm   = new MUtil();
const _user = new User();
class NavTop extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: _mm.getStorage('userInfo').username
        }
    }

    //退出登录
    onLogout() {
        _user.logout().then((res) => {
            // resolve
            let path = window.location.pathname;
            _mm.removeStorage('userInfo');
            // this.props.history.push('/login');
            window.location.href = '/login?redirect=' + encodeURIComponent(path)
        }, (errMsg) => {
            // reject
            _mm.errorTips(errMsg);
        })
    }

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
                            {
                                this.state.username
                                ? <span>欢迎，{ this.state.username }</span>
                                : <span>欢迎您</span>
                            }
                            <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li onClick={ e => this.onLogout(e)}>
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
