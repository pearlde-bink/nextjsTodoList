"use client";
import React, { Component } from "react";

// const getTodos = async () => {
//   let todos = await fetch("http://localhost:8000/api/todo/list");
//   return todos.json();
// }

interface Todo {
  id: number;
  title: string;
  status: string;
}

interface ToDoListTableProps {
  todos: Todo[];
  removeTodo: (id: number) => void;
  toggleToDoStatus: (id: number) => void;
  changeTodoTitle: (id: number, title: string) => void;
}

class ToDoListTable extends Component<ToDoListTableProps> {
  handleChangeTitle = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newsTitle = e.target.value;
    this.props.changeTodoTitle(id, newsTitle);
  };

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
                  <input type="text" className="form-control" />
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
              {this.props.todos.map((todo, index) => (
                <tr key={todo.id}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      value={todo.title}
                      onChange={(e) => this.handleChangeTitle(todo.id, e)}
                    />
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
                      type="button"
                      className="btn btn-warning"
                      onClick={() =>
                        this.props.changeTodoTitle(todo.id, todo.title)
                      }
                    >
                      <span className="fa fa-pencil mr-5" />
                      Sửa
                    </button>
                    &nbsp;
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => this.props.removeTodo(todo.id)}
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
