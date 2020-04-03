import React, { Component } from "react";
import { Table } from "antd";
import "antd/dist/antd.css";

export class DocumentTable extends Component {
  render() {
    const columns = [
      {
        title: "File Name",
        dataIndex: "fileName",
        sorter: (a, b) => a.fileName.length - b.fileName.length,
        ellipsis: true,
        sortDirections: ["descend", "ascend"]
      },
      {
        title: "File Version",
        dataIndex: "fileVersion",
        sorter: (a, b) => a.fileVersion - b.fileVersion,
        ellipsis: true,
        sortDirections: ["descend", "ascend"]
      },
      {
        title: "Attached File",
        dataIndex: "",
        render: obj => <a href={obj.fileUrl}>Download File</a>
      },
      {
        title: "File Content",
        dataIndex: "fileContent",
        sorter: (a, b) => a.fileVersion - b.fileVersion,
        ellipsis: true,
        sortDirections: ["descend", "ascend"]
      }
    ];
    return (
      <Table
        columns={columns}
        pagination={{ showSizeChanger: true }}
        dataSource={this.props.docs}
        rowKey="fileName"
      />
    );
  }
}
