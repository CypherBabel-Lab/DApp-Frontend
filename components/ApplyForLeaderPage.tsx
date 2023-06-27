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
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
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
          Name: <Input />
        </div>
        <div>
          Symbol: <Input />
        </div>
        <div>
          底层资产
          <Select
            // defaultValue={{ value: 'USDT', label: 'USDT' }}
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: 'USDT', label: 'USDT' },
              { value: 'BTC', label: 'BTC' },
              { value: 'ETH', label: 'ETH' },
            ]}
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
