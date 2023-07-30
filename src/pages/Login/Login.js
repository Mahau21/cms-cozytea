import { useState, useEffect } from "react"
import { Form, Input, Button, Divider, notification } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { apiAuth } from "api"
import Background from "images/Background.png"
import { useStore } from "components/ui"

export default function Login() {
  const navigate = useNavigate()
  const { setAuth } = useStore()
  const [loading, setLoading] = useState(false)

  async function onFinish(values) {
    try {
      setLoading(true)
      const { token, refresh, role, user, id, menus, logo_side_bar } = await apiAuth.login(values)
      setAuth({
        token,
        refresh,
        role,
        fullname: user.name,
        menus,
        logo: logo_side_bar
      })

      if (menus && menus.length > 0) {
        navigate("/dashboard")
      } else {
        notification.error({ description: "User null permisson!", message: "Error" })
      }
    } catch (e) {
      throw e
    } finally {
      setLoading(false)
    }
  }

  function demoLogin(key) {
    let values = {}
    switch (key) {
      case "manager":
        values = {
          username: "thangnd2",
          password: "111111@"
        }
        break
      case "root":
        values = {
          username: "huyhq",
          password: "abc@123X"
        }
        break
      case "collaborator":
        values = {
          username: "collaborator1",
          password: "111111@"
        }
        break
      case "customer":
        values = {
          username: "seller@gmai.com",
          password: "123456"
        }
        break
      case "warehouse":
        values = {
          username: "warehouse@gmai.com",
          password: "123456"
        }
        break
      default:
        break
    }
    onFinish(values)
  }

  useEffect(() => {
    const checkToken = localStorage.getItem("accessToken")
    if (checkToken) navigate("/")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className="p-4 h-screen pt-52 bg-cover bg-slate-800"
      style={{ backgroundImage: "url(" + Background + ")" }}
    >
      <div className="inset-0 absolute z-10 bg-black/70"></div>
      <div className="absolute z-20 inset-0 flex items-center justify-center">
        <div className="shadow-lg relative w-full max-w-sm m-auto bg-white/60 backdrop-blur-sm p-6 rounded-lg">
          <Form name="normal_login" layout="vertical" className="" onFinish={onFinish}>
            <div className="flex justify-end absolute right-8 top-8">
              <img src="/logo180.svg" alt="" className="w-16" />
            </div>
            <div className="py-4 text-4xl font-bold mb-4 text-primary">Đăng nhập</div>

            <Form.Item
              label="Tài khoản (Email, Uername)"
              name="username"
              rules={[{ required: true, message: "Xin mời nhập tài khoản" }]}
            >
              <Input placeholder="admin..." size="large" />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                { required: true, message: "Xin mời nhập mật khẩu" },
                { min: 6, message: "Mật khẩu ít nhất 6 ký tự!" }
              ]}
            >
              <Input.Password placeholder="Mật khẩu..." size="large" />
            </Form.Item>
            {/* {!window.location.href.includes("cms.vn") && ( */}
            <div>
              <div className="flex mb-2 gap-4">
                <Button onClick={() => demoLogin("root")}>Root</Button>
                <Button onClick={() => demoLogin("manager")}>Manager</Button>
                <Button onClick={() => demoLogin("collaborator")}>Cộng tác viên</Button>
              </div>
            </div>
            {/* )} */}
            <Form.Item>
              <Button
                loading={loading}
                type="primary"
                size="large"
                htmlType="submit"
                className="mt-4 w-full mb-4"
              >
                Đăng nhập
              </Button>

              <div className="flex justify-end items-center">
                <Link to="/forgot-password">Quên mật khẩu</Link>
                <Divider type="vertical" />
                <Link to="/register">Đăng ký</Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

const xx = {
  success: true,
  message: null,
  data: [
    {
      created_date: "2022-06-16T16:28:14.302082Z",
      description: "Highlights - Roland Garros - BK Đơn Nam - Casper Ruud vs Marin Cilic",
      duration: 0,
      file_name:
        "highlights-roland-garros-bk-don-nam-casper-ruud-vs-marin-cilic-hrgbdncrvmc683220.mp4.xml",
      id: 1,
      id_third_party: "hrgbdncrvmc683220m",
      image1:
        "highlights-roland-garros-bk-don-nam-casper-ruud-vs-marin-cilic-hrgbdncrvmc683220.jpg",
      image2:
        "highlights-roland-garros-bk-don-nam-casper-ruud-vs-marin-cilic-hrgbdncrvmc683220_Poster.jpg",
      job_id: "00000000-0000-0000-0000-000000000000",
      modified_date: "2022-06-16T16:28:14.309273Z",
      title: "Highlights - Roland Garros - BK Đơn Nam - Casper Ruud vs Marin Cilic",
      trans_status: 0,
      vod: "highlights-roland-garros-bk-don-nam-casper-ruud-vs-marin-cilic-hrgbdncrvmc683220.mp4"
    },
    {
      created_date: "2022-06-16T16:28:15.008162Z",
      description: "Highlights - Roland Garros - BK Đơn Nam - Casper Ruud vs Marin Cilic",
      duration: 0,
      file_name: "aa.xml",
      id: 2,
      id_third_party: "hrgbdncrvmc683220m",
      image1:
        "highlights-roland-garros-bk-don-nam-casper-ruud-vs-marin-cilic-hrgbdncrvmc683220.jpg",
      image2:
        "highlights-roland-garros-bk-don-nam-casper-ruud-vs-marin-cilic-hrgbdncrvmc683220_Poster.jpg",
      job_id: "00000000-0000-0000-0000-000000000000",
      modified_date: "2022-06-16T16:28:15.008164Z",
      title: "Highlights - Roland Garros - BK Đơn Nam - Casper Ruud vs Marin Cilic",
      trans_status: 0,
      vod: "aa"
    },
    {
      created_date: "2022-06-16T16:28:15.011028Z",
      description:
        "Phim nói về vụ án của Nữ hoàng Sakura và Hoàng tử Gill của đất nước Vespania, song song đó là vụ cướp Vương miện Nữ hoàng của Lupin Đệ Tam",
      duration: 0,
      file_name:
        "hhnb-lupin-de-tam-doi-dau-tham-tu-lung-danh-conan-hldtddttldc216694.mp4 - Copy.xml",
      id: 3,
      id_third_party: "hldtddttldc216694m",
      image1: "hhnb-lupin-de-tam-doi-dau-tham-tu-lung-danh-conan-hldtddttldc216694.jpg",
      image2: "hhnb-lupin-de-tam-doi-dau-tham-tu-lung-danh-conan-hldtddttldc216694_Poster.jpg",
      job_id: "00000000-0000-0000-0000-000000000000",
      modified_date: "2022-06-16T16:28:15.011029Z",
      title: "HHNB - Lupin Đệ Tam Đối Đầu Thám Tử Lừng Danh Conan",
      trans_status: 0,
      vod: "hhnb-lupin-de-tam-doi-dau-tham-tu-lung-danh-conan-hldtddttldc216694.mp4 - Copy"
    },
    {
      created_date: "2022-06-16T16:28:15.01431Z",
      description:
        "Phim nói về vụ án của Nữ hoàng Sakura và Hoàng tử Gill của đất nước Vespania, song song đó là vụ cướp Vương miện Nữ hoàng của Lupin Đệ Tam",
      duration: 0,
      file_name: "hhnb-lupin-de-tam-doi-dau-tham-tu-lung-danh-conan-hldtddttldc216694.mp4.xml",
      id: 4,
      id_third_party: "hldtddttldc216694m",
      image1: "hhnb-lupin-de-tam-doi-dau-tham-tu-lung-danh-conan-hldtddttldc216694.jpg",
      image2: "hhnb-lupin-de-tam-doi-dau-tham-tu-lung-danh-conan-hldtddttldc216694_Poster.jpg",
      job_id: "00000000-0000-0000-0000-000000000000",
      modified_date: "2022-06-16T16:28:15.014312Z",
      title: "HHNB - Lupin Đệ Tam Đối Đầu Thám Tử Lừng Danh Conan",
      trans_status: 0,
      vod: "hhnb-lupin-de-tam-doi-dau-tham-tu-lung-danh-conan-hldtddttldc216694.mp4"
    },
    {
      created_date: "2022-06-16T16:28:15.016957Z",
      description: "Đắm mình trong hành trình trinh thám của thám tử lừng danh Conan.",
      duration: 0,
      file_name: "hhnb-tham-tu-lung-danh-conan-tap-22-ke-hanh-phap-zero-httldct2khpz794030.mp4.xml",
      id: 5,
      id_third_party: "httldct2khpz794030m",
      image1: "hhnb-tham-tu-lung-danh-conan-tap-22-ke-hanh-phap-zero-httldct2khpz794030.jpg",
      image2: "hhnb-tham-tu-lung-danh-conan-tap-22-ke-hanh-phap-zero-httldct2khpz794030_Poster.jpg",
      job_id: "00000000-0000-0000-0000-000000000000",
      modified_date: "2022-06-16T16:28:15.016958Z",
      title: "HHNB - Thám Tử Lừng Danh Conan Tập 22: Kẻ Hành Pháp Zero",
      trans_status: 0,
      vod: "hhnb-tham-tu-lung-danh-conan-tap-22-ke-hanh-phap-zero-httldct2khpz794030.mp4"
    }
  ],
  status_code: 200
}
