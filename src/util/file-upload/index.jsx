/*
 * @Author: yuze.xia 
 * @Date: 2021-05-12 16:47:26 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-05-18 00:28:32
 */
import React from 'react';
import FileUpload from './react-fileupload.jsx';

class FileUploader extends React.Component{
    render(){
        /*set properties*/
        const options={
            baseUrl         :'/manage/product/upload.do',
            fileFieldName   : 'upload_file',
            dataType        : 'json',
            chooseAndUpload : true,
            uploadSuccess: (res) => {
                console.log(res);
            },
            uploadError: (err) => {
                console.log(err);
            }
        }
        /*Use FileUpload with options*/
        /*Set two dom with ref*/
        return (
            <FileUpload options={options}>
                <button ref="chooseAndUpload">请选择图片</button>
            </FileUpload>
        )	        
    }
}

export default FileUploader;
