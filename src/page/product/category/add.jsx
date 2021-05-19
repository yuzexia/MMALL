/*
 * @Author: yuze.xia 
 * @Date: 2021-05-19 16:50:49 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-05-19 16:53:05
 */
import React from 'react';

import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

import PageTitle from 'component/page-title/index.jsx';

const _mm = new MUtil();
const _product = new Product();

class CategoryAdd extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }

    loadCategoryList() {
        _product.getCategoryList().then(res => {
            console.log(res);
            this.setState({
                list: res
            })
        }, errMsg => {
            _mm.errorTips(errMsg);
        })
    }

    componentDidMount() {
        this.loadCategoryList();
    }
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="添加品类"/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-md-2 control-label">所属品类</label>
                                <div className="col-md-10 col-md-5">
                                    <select name="parentId">
                                        <option value="0">根品类/</option>
                                        {
                                            this.state.list.map((category, index) => {
                                                return <option value={category.id} key={index}>根品类/{category.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品描述</label>
                                <div className="col-md-10 col-md-5">
                                    <input type="text" className="form-control" 
                                        name="subtitle"
                                        onChange={e => this.onValueChange(e)}
                                        placeholder="请输入商品描述" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CategoryAdd;
