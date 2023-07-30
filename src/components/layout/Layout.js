import React, { useState } from "react"
import Icon from "@ant-design/icons"
import MyHeader from "./Header/Header"
import { useStore } from "components/ui"
import Navbar from "./Navbar"
import "./index.css"

function convertMenus(menus) {
  return menus.map((i) => {
    const IconX = () => <span dangerouslySetInnerHTML={{ __html: i.icon }} />
    let __children = []
    const newChildren = i.children
    if (newChildren.length > 0) {
      for (let index = 0; index < newChildren.length; index++) {
        if (newChildren[index].is_active) {
          const IconY = () => <span dangerouslySetInnerHTML={{ __html: newChildren[index].icon }} />
          const item = {
            href: i.url + newChildren[index].url,
            label: newChildren[index].title,
            icon: <Icon component={IconY} />
          }
          __children.push(item)
        }
      }
    }

    return {
      href: i.url,
      label: i.title,
      icon: <Icon component={IconX} />,
      children: __children
    }
  })
}

function MyLayout({ children }) {
  const { menus, fullname } = useStore()
  const [isNav, setIsNav] = useState(true)

  function togleSidebar() {
    setIsNav((c) => !c)
  }
  return (
    <div className="flex min-h-screen">
      <Navbar items={__menus} isNav={isNav} />

      <section className="flex-grow w-0 bg_layout_content">
        <header className="flex justify-between bg-slate-900 py-2 pr-6 pl-4 h-14 w-full sticky top-0 z-20">
          <button onClick={togleSidebar} className={`text-slate-200 rounded`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </button>

          <MyHeader fullname={fullname} />
        </header>
        <div className="p-6">{children}</div>
      </section>
    </div>
  )
}
export default MyLayout

const icIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h8m-8 6h16" />
  </svg>
)

const __menus = [
  {
    href: "/dashboard",
    label: "Trang chủ",
    icon: icIcon,
    children: []
  },
  {
    href: "/product",
    label: "Quản lý product",
    icon: icIcon,
    children: []
  },
  {
    href: "/category",
    label: "Quản lý category",
    icon: icIcon,
    children: []
  },
  {
    href: "/tag",
    label: "Quản lý tag",
    icon: icIcon,
    children: []
  },
  {
    href: "/site",
    label: "Quản lý site",
    icon: icIcon,
    children: []
  },
  {
    href: "/region",
    label: "Quản lý region",
    icon: icIcon,
    children: []
  }
]
