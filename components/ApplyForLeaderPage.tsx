import React, { useState } from 'react'
import Sidbar from './Sidbar'
import SectionContainer from './SectionContainer'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Modal, Upload, Input, Select } from 'antd'
import type { RcFile, UploadProps } from 'antd/es/upload'
import type { UploadFile } from 'antd/es/upload/interface'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

const ApplyForLeaderPage = () => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [describeValue, setDescribeValue] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const handleCancel = () => setPreviewOpen(false)
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile)
    }
    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
    )
  }
  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList)

  return (
    <Sidbar>
      <div
        style={{
          color: 'white',
          width: '70%',
          margin: 'auto',
          height: '70%',
          padding: '20px',
        }}
        className="rounded-2xl bg-zinc-800"
      >
        <div>
          头像:
          <>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-circle"
              // fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              <PlusOutlined />
              Upload
            </Upload>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </>
        </div>
        <div>
          Name: <Input />
        </div>
        <div>
          底层资产
          <Select
            defaultValue={{ value: 'USDT', label: 'USDT' }}
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: 'USDT', label: 'USDT' },
              { value: 'BTC', label: 'BTC' },
              { value: 'ETH', label: 'ETH' },
            ]}
          />
        </div>
        <div>
          描述
          <ReactQuill
            style={{ height: '200px' }}
            theme="snow"
            value={describeValue}
            onChange={setDescribeValue}
            //   className="ql-editor"
          />
        </div>
        <div className="mt-14">
          <Button className="w-full">Create</Button>
        </div>
      </div>
    </Sidbar>
  )
}
export default ApplyForLeaderPage
