import { Pagination } from "antd"

const MyPagination = ({ page_num, onChange, page_size, count }) => {
  return (
    <div className="flex justify-between mt-4 items-center">
      <div>Tổng số bản ghi: {count || 0}</div>
      {count > 0 && (
        <Pagination
          className="m-2"
          showSizeChanger
          current={parseInt(page_num)}
          pageSize={parseInt(page_size)}
          pageSizeOptions={[10, 20, 50, 100]}
          total={count}
          onChange={onChange}
          defaultCurrent={1}
        />
      )}
    </div>
  )
}
export default MyPagination
