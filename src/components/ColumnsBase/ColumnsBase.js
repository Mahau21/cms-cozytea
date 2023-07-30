import { Popconfirm, Tag, Tooltip } from "antd"
import TagLiveStatus from "components/TagLiveStatus"
import TagTranscodeStatus from "components/TagTranscodeStatus"
import TagType from "components/TagType"
import CONSTANT from "lib/constains"
import { convertLink } from "lib/function"
import moment from "moment-timezone"
import { Link } from "react-router-dom"
import { icDelete, icEdit, icList, icPlus } from "./icons"

const columns = {
  thumb: ({ onAction, router, isTranscode, routerList }) => {
    return {
      title: "Tên",
      dataIndex: "name",
      minWidth: 340,
      fixed: "left",
      render: (v, r) => (
        <div className="flex gap-2 wapper__action">
          <div className="relative basis-28">
            {isTranscode && (
              <div className="absolute top-1 right-1 z-20">
                <TagTranscodeStatus status={r?.transcode_status} />
              </div>
            )}
            <div className="w-28 bg-slate-500 rounded-sm h-[63px]">
              <img loading="lazy" className="rounded-sm" src={convertLink(r?.thumb)} alt="" />
            </div>
          </div>

          <div className="relative flex-grow">
            <div className="line-clamp-3">{v}</div>
            <div className="absolute px-2 py-2 w-full -bottom-2 opacity-0 -left-2 duration-200 ease-in-out __action">
              <div className="flex gap-3">
                <Tooltip placement="top" title="Sửa">
                  <button
                    className="bg-primary text-white shadow hover:bg-opacity-70 rounded h-9 w-9 flex items-center justify-center"
                    onClick={() => onAction("edit", r)}
                  >
                    {icEdit}
                  </button>
                </Tooltip>

                {router && (
                  <Tooltip placement="top" title={router.name}>
                    <Link to={`${router.href}/${r?.id}`}>
                      <button
                        type="primary"
                        className="bg-primary text-white shadow hover:bg-opacity-70 rounded h-9 w-9 flex items-center justify-center"
                        onClick={() => onAction("edit", r)}
                      >
                        {icPlus}
                      </button>
                    </Link>
                  </Tooltip>
                )}
                {routerList && (
                  <Tooltip placement="top" title={routerList.name}>
                    <Link to={`${routerList.href}/${r?.id}/list`}>
                      <button
                        type="primary"
                        className="bg-primary text-white shadow hover:bg-opacity-70 rounded h-9 w-9 flex items-center justify-center"
                        onClick={() => onAction("edit", r)}
                      >
                        {icList}
                      </button>
                    </Link>
                  </Tooltip>
                )}

                <Tooltip placement="top" title="Xóa">
                  <Popconfirm
                    title="Bạn có chắc chắn muốn xóa!"
                    onConfirm={() => onAction("remove", r?.id)}
                  >
                    <button
                      type="primary"
                      className="bg-red-600 text-white shadow hover:bg-opacity-70 rounded h-9 w-9 flex items-center justify-center"
                    >
                      {icDelete}
                    </button>
                  </Popconfirm>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      )
    }
  },
  createAt: () => {
    return {
      title: "Ngày tạo",
      dataIndex: "created",
      key: "created",
      width: 140,
      sorter: true,
      render: (v) => <div className="text-gray-400">{moment(v).format("HH:mm DD-MM-Y")}</div>
    }
  },
  updateAt: () => {
    return {
      title: "Ngày cập nhật",
      dataIndex: "modified",
      key: "modified",
      width: 140,
      sorter: true,
      render: (v) => <div className="text-gray-400">{moment(v).format("HH:mm DD-MM-Y")}</div>
    }
  },
  description: () => {
    return {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: 200,
      render: (v) => (
        <Tooltip placement="topLeft" title={v}>
          <div className="line-clamp-3">{v}</div>
        </Tooltip>
      )
    }
  },
  contentType: () => {
    return {
      title: "Loại nội dung",
      dataIndex: "config_type",
      width: 140,
      render: (v, r) => (
        <div className="space-y-2">
          <TagType type={CONSTANT.CONFIG_TYPE} name={v?.name} />
          <TagType type={CONSTANT.CONFIG_AGE} name={r?.config_age?.name} />
        </div>
      )
    }
  },
  contentAge: () => {
    return {
      title: "Độ tuổi",
      dataIndex: "config_age",
      width: 140,
      render: (v, r) => (
        <div className="space-y-2">
          <TagType type={CONSTANT.CONFIG_AGE} name={v?.name} />
        </div>
      )
    }
  },
  category: () => {
    return {
      title: "Thể loại",
      dataIndex: "topic_ids",
      width: 200,
      render: (v) => (
        <div className="gap-4 space-y-2">
          {v?.length > 0 &&
            v.map((i, k) => {
              return <TagType key={k} type={CONSTANT.CONFIG_CATEGORY} name={i.name} />
            })}
        </div>
      )
    }
  },
  isActive: () => {
    return {
      title: "Hiển thị",
      key: "is_active",
      dataIndex: "is_active",
      width: 90,
      align: "center",
      render: (v) => {
        return (
          <Tag className="rounded-xl" color={v ? "blue" : "red"}>
            {v ? "Có" : "Ẩn"}
          </Tag>
        )
      }
    }
  },
  liveStatus: () => {
    return {
      title: "Trạng thái live",
      dataIndex: "status",
      width: 140,
      render: (v) => <TagLiveStatus status={v} />
    }
  },
  link: () => {
    return {
      title: "Link",
      dataIndex: "link",
      key: "link",
      width: 200,
      render: (v) => (
        <Tooltip placement="topLeft" title={v}>
          <div className="line-clamp-3">{v}</div>
        </Tooltip>
      )
    }
  }
}

export default columns
