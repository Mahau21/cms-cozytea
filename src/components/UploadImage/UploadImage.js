import React, { useState, useRef, useEffect } from "react"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { Upload, message } from "antd"
import ImgCrop from "antd-img-crop"
import { getAuthLocal } from "lib/localstorage"
import "./index.css"
import { convertLink } from "lib/function"

function beforeUpload(file) {
  const isLt3M = file.size / 1024 / 1024 < 2
  if (!isLt3M) {
    message.error("Ảnh phải nhỏ hơn 2mb")
  }
  return isLt3M
}

function convertAspect(shape) {
  let obj = { aspect: 16 / 9, className: "upload__vertical" }

  if (shape === "square") {
    obj.aspect = 1
    obj.className = "upload__square"
  }
  if (shape === "horizontal") {
    obj.aspect = 9 / 16
    obj.className = "upload__horizontal"
  }
  return obj
}

const UploadImage = React.forwardRef(({ onChange, value, shape = "vertical" }, ref) => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()
  const link = useRef()

  const handleChange = ({ file }) => {
    if (file.status === "uploading") {
      setLoading(true)
      return
    }
    if (file.status === "done") {
      console.log({ file })
      const url = file?.response?.thumbnail?.origin
      const baselink = file?.response?.name
      link.current = baselink
      setImageUrl(url)
      onChange(baselink)
    }
  }

  useEffect(() => {
    if (link.current !== value) setImageUrl(convertLink(value))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const config = convertAspect(shape)
  return (
    <div className="flex items-center">
      <ImgCrop
        rotate
        aspect={config.aspect}
        beforeCrop={beforeUpload}
        quality={1}
        fillColor="transparent"
      >
        <Upload
          ref={ref}
          accept="image/*"
          className={config.className}
          name="file"
          action={`${process.env.REACT_APP_API_UPLOAD}/api/v1/upload_image_fix_thumbnail`}
          listType="picture-card"
          showUploadList={false}
          headers={{
            Authorization: `Bearer ${getAuthLocal()?.token}`
          }}
          onChange={handleChange}
        >
          <div className="relative upload_label">
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" className="w-full" />
            ) : (
              <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">Upload</div>
              </div>
            )}
          </div>
        </Upload>
      </ImgCrop>
    </div>
  )
})

export default UploadImage
