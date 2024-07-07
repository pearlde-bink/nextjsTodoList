"use client";
import React, { Component } from "react";
import Script from "next/script";

interface Todo {
  id: string;
  title: string;
  status: string;
}

interface ToDoListTableProps {
  todos: Todo[];
  todolistwithkw: Todo[];
  removeTodo: (id: string) => void;
  toggleToDoStatus: (id: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleAddFormVisible: () => void;
  toggleChangeTodo: (Todo: Todo) => void;
  reState: (todo: Todo) => void;
}

class ToDoListTable extends Component<ToDoListTableProps> {
  render() {
    return (
      <div className="row mt-15">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th className="text-center">STT</th>
                <th className="text-center">Tên</th>
                <th className="text-center">Trạng Thái</th>
                <th className="text-center">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td />
                <td>
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.props.handleInputChange}
                  />
                </td>
                <td>
                  <select className="form-control">
                    <option value={-1}>Tất Cả</option>
                    <option value={0}>Ẩn</option>
                    <option value={1}>Kích Hoạt</option>
                  </select>
                </td>
                <td />
              </tr>
              {this.props.todos.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>
                    <p>{todo.title}</p>
                  </td>
                  <td className="text-center">
                    <span
                      style={{
                        cursor: "pointer",
                        textDecoration:
                          todo.status === "Ẩn" ? "line-through" : "none",
                      }}
                      onClick={() => this.props.toggleToDoStatus(todo.id)}
                    >
                      {todo.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      id="toastbtn"
                      type="button"
                      className="btn btn-warning"
                      onClick={() => {
                        this.props.toggleChangeTodo(todo);
                      }}
                    >
                      <span className="fa fa-pencil mr-5" />
                      Sửa
                    </button>
                    &nbsp;
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() =>
                        this.props.removeTodo(todo.id as unknown as string)
                      }
                    >
                      <span className="fa fa-trash mr-5" />
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ToDoListTable;
