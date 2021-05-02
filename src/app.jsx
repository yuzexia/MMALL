/*
 * @Author: yuze.xia 
 * @Date: 2021-04-29 15:03:27 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-05-02 14:10:55
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'

// 页面
import Home from 'page/home/index.jsx';
import Layout from 'component/layout/index.jsx';

class App extends React.Component{
    render() {
        return (
            <Router>
                <Layout>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route to="/product" componetn={Home} />
                        <Route to="/product.category" componetn={Home} />
                        <Route to="/order" componetn={Home} />
                        <Route to="/user" componetn={Home} />
                    </Switch>
                </Layout>
            </Router>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
