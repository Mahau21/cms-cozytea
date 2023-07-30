import { Button } from "antd"
import React from "react"
import { Link } from "react-router-dom"
import "./index.scss"

export default function Home() {
  return (
    <div className="flex justify-center bg-blue-400 p-4">
      <div className="text-2xl font-bold">Home page tin trang chủ (Tính năng đang xây dựng)</div>
      <Link to="/login">
        <Button>Login</Button>
      </Link>
    </div>
  )
}
