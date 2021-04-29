/*
 * @Author: yuze.xia 
 * @Date: 2021-04-29 15:03:27 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-04-29 15:53:02
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'

// 页面
import Home from 'page/home/index.jsx';

class App extends React.Component{
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Redirect from="*" to="/"/>
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
