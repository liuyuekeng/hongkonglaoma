define(function(){
    /*
     * 文件上传组件
     */
    
    var FileUploader = React.createClass({
        handleSubmit: function(ev){
            ev.preventDefault();
            var _this = this;

            var inputDom = React.findDOMNode(this.refs.file);

            // 条件过滤
            if(!inputDom.files || !inputDom.files.length){
                alert('请先选择文件');
                return;
            }
            if(!window.FormData){
                console.log('浏览器不支持 FormData 对象');
                return;
            }
            if(!window.XMLHttpRequest){
                console.log('浏览器不支持 XMLHttpRequest 对象');
                return;
            }

            // 读取文件数据
            var filereader = new FileReader();
            filereader.addEventListener('load', function(){
                if(filereader.error){
                    console.log('error: ' + filereader.error);
                    return;
                }
                _this.sendData(inputDom.files[0], filereader.result);
            });
            filereader.readAsBinaryString(inputDom.files[0]);
        },
        sendData: function(fileObject, fileContent){     // 拼装数据并发送
            var XHR = new XMLHttpRequest();
            var data = '';

            // 拼接数据字符串
            data += '--blob\r\n';
            data += 'content-disposition: form-data; '
                    + 'name="fileuploader"; '
                    + 'filename="' + fileObject.name + '"\r\n'
                    + 'Content-Type: ' + fileObject.type + '\r\n'
                    + '\r\n'
                    + fileContent + '\r\n'
                    + '--blob--';

            XHR.addEventListener('load', function(ev){
                console.log('post data upload success');
            });
            XHR.addEventListener('error', function(ev){
                console.log('post data upload fail');
            });

            XHR.open('POST', '/api/upload');
            XHR.setRequestHeader('Content-Type','multipart/form-data; boundary=blob');

            XHR.send(data);
        },
        render: function(){
            return (
                <div className="common-fileuploader">
                    文件上传
                    <form action="/api/upload" method="post" ref="form">
                        <input type="file" name="fileuploader_file" ref="file" multiple="multiple" />
                        <input type="submit" onClick={this.handleSubmit}/>
                    </form>
                </div>
            )
        }
    });

    return FileUploader;
});
