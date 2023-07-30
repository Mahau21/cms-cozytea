import { useEffect, useRef, useState } from "react"
import "./index.css"

export default function Collapae({ isOpen, children, isShow }) {
  const [childHeight, setChildHeight] = useState(0)
  const content = useRef()

  useEffect(() => {
    const childHeightRaw = content.current.offsetHeight
    const childHeight = `${childHeightRaw}px`
    setChildHeight(childHeight)
  }, [])

  const className = isShow
    ? "px-4"
    : "absolute -z-10 left-full top-0 bg-slate-900 shadow opacity-0 rounded"
  return (
    <div
      className={`collapse ${className}`}
      style={{
        maxHeight: isOpen || !isShow ? childHeight : 0
      }}
    >
      <div ref={content}>{children}</div>
    </div>
  )
}
