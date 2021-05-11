/*
 * @Author: yuze.xia 
 * @Date: 2021-05-10 09:53:07 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-05-10 10:01:19
 */
import React from 'react';
import {BrowserRouter as Router, Switch, Link, Redirect, Route} from 'react-router-dom';

// 页面
import ProductList from 'page/product/index/index.jsx';
import ProductSave from 'page/product/index/save.jsx';

class ProductRouter extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route path="/product/index" component={ProductList} />
                <Redirect exact from="/product" to="/product/index" />
                <Route path="/product/save" component={ProductSave} />
            </Switch>
        )
    }
}

export default ProductRouter;
