/*
 * @Author: yuze.xia 
 * @Date: 2021-04-29 16:37:08 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-05-02 14:24:02
 */
import React from 'react';
import { Link, NavLink} from 'react-router-dom';

class NavSide extends React.Component{
    render() {
        return (
            <div className="navbar-default navbar-side" role="navigation">
                <div className="sidebar-collapse">
                    <ul className="nav" id="main-menu">
                        <li>
                        {/* 选中状态下的className=“active-menu” */}
                            <NavLink exact activeClassName="active-menu" to="/">
                                <i className="fa fa-dashboard"></i>
                                <span>首页</span>
                            </NavLink>
                        </li>
                        <li class="active">
                            <Link to="/product">
                                <i className="fa fa-sitemap"></i> 
                                <span>商品</span>
                                <span className="fa arrow"></span>
                            </Link>
                            {/* 收起的className="collapse" */}
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink to="/product" activeClassName="active-menu">商品管理</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/product-category" activeClassName="active-menu">品类管理</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li class="active">
                            <Link to="/order">
                                <i className="fa fa-sitemap"></i> 
                                <span>订单</span>
                                <span className="fa arrow"></span>
                            </Link>
                            {/* 收起的className="collapse" */}
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink to="/order" activeClassName="active-menu">订单管理</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li class="active">
                            <Link to="/user">
                                <i className="fa fa-sitemap"></i> 
                                <span>用户</span>
                                <span className="fa arrow"></span>
                            </Link>
                            {/* 收起的className="collapse" */}
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink to="/user" activeClassName="active-menu">用户管理</NavLink>
                                </li>
                            </ul>
                        </li>
                    </ul>

                </div>

            </div>
        )
    }
}

export default NavSide;
