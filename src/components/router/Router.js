import { Navigate, Outlet, BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Layout from "components/layout/Layout"
import { Card, Result } from "antd"
import SuspenseComponent from "./SuspenseComponent"
import { Suspense } from "react"
import pageList from "./PageList"
import Login from "pages/Login/Login"
import HomePage from "pages/HomePage"
import { useStore } from "components/ui"

function ProtectedRoute({ redirectPath = "/" }) {
  return (
    <Layout>
      <Suspense fallback={<SuspenseComponent />}>
        <Outlet />
      </Suspense>
    </Layout>
  )
}

export default function Routers() {
  // const { token, menus } = useStore()
  const token = true
  return (
    <Router>
      <Routes>
        {token ? (
          <Route element={<ProtectedRoute />}>
            {pageList().map(({ Element, code, path }, key) => {
              return <Route path={path} key={key} element={<Element />} />
            })}
            <Route path="*" element={<NotLoadAuthorization />} />
          </Route>
        ) : (
          <Route element={<Outlet />}>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<HomePage />} />
          </Route>
        )}
      </Routes>
    </Router>
  )
}

const NotLoadAuthorization = () => {
  return (
    <div className="__content">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Link to="/">Back Home</Link>}
      />
    </div>
  )
}
