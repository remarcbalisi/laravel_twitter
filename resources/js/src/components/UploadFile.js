import React, {useState} from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadFile = () => {
  const [fileList, setFileList] = useState([])

  const props = {
    name: 'file',
    action: `${process.env.MIX_BASE_URL}user/file-upload`,
    onChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        const fileUrl = `${process.env.MIX_APP_URL}storage/${JSON.parse(file.xhr.response).data.path}`
        const fileProps = {
          uid: file.uid,
          name: file.name,
          status: 'done',
          url: fileUrl,
          thumbUrl: fileUrl,
        }
        setFileList([fileProps])
      }
    },
    defaultFileList: fileList,
    listType: "picture"
  };

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  );
}

export default UploadFile;
