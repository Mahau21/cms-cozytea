import React, { useState } from "react"
import { Upload, message } from "antd"
import { useEffect } from "react"
import { PlusOutlined } from "@ant-design/icons"
import Modal from "antd/lib/modal/Modal"

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
function beforeUpload(file) {
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error("Ảnh phải nhỏ hơn 2mb")
  }
  return isLt2M
}

const UploadImages = ({ onChange, value }) => {
  const [fileList, setFileList] = useState([])
  const [previewVisible, setpPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState("")
  const handleChange = ({ fileList }) => {
    setFileList(fileList)
  }

  useEffect(() => {
    // if (value !== imageUrl) setImageUrl(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  async function handlePreview(file) {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setpPreviewVisible(true)
  }

  useEffect(() => {
    const list = fileList.map((i) => {
      if (i.status === "done") return i.response.source
    })
    // console.log({ list })
    onChange(list)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileList])
  // console.log({ fileList })
  return (
    <div>
      <Upload
        name="file"
        action={`${process.env.REACT_APP_DOMAIN}uploads/images`}
        listType="picture-card"
        className="avatar-uploader"
        multiple
        headers={{
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }}
        ileList={fileList}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        onPreview={handlePreview}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title="Preview"
        footer={null}
        onCancel={() => setpPreviewVisible(false)}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  )
}

export default UploadImages
