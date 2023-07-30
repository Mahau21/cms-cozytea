import { useNavigate } from "react-router-dom"

export default function MyPagination({ title }) {
  const navigate = useNavigate()
  return (
    <div className="flex items-center mb-2">
      <button onClick={() => navigate(-1)} className="cursor-pointer pr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>
      <div className="font-semibold text-xl ml-2 text-slate-600">{title}</div>
    </div>
  )
}
