/*
 * @Author: yuze.xia 
 * @Date: 2021-05-02 14:38:06 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-05-02 14:52:31
 */
import React from 'react';

class PageTitle extends React.Component{
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        document.title = this.props.title + ' - H MMALL';
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h1 className="page-header">{this.props.title}</h1>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default PageTitle;