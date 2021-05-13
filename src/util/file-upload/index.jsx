/*
 * @Author: yuze.xia 
 * @Date: 2021-05-12 16:47:26 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-05-12 19:27:13
 */
import React from 'react';
import FileUpload from './react-fileupload.jsx';

class FileUploader extends React.Component{
    render(){
        /*set properties*/
        const options={
            baseUrl:'/manage/product/upload.do',
            fileName: 'upload_file',
            dataType: 'json',
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
                <button ref="chooseBtn">choose</button>
                <button ref="uploadBtn">upload</button>
            </FileUpload>
        )	        
    }
}

export default FileUploader;
