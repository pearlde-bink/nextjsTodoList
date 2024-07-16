"use client";
import React, { Component } from "react";
import Script from "next/script";

interface Todo {
  id: string;
  title: string;
  status: string;
  date: string;
}

interface ToDoListTableProps {
  todos: Todo[];
  todolistwithkw: Todo[];
  // removeTodo: (id: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleAddFormVisible: () => void;
  toggleChangeTodo: (Todo: Todo) => void;
  reState: (todo: any) => void;
  updateCurrentTodos: () => void;
}

class ToDoListTable extends Component<ToDoListTableProps> {
  updateList = (td: Todo[]) => {
    this.setState(
      {
        todos: td,
        todolistwithkw: td,
      },
      this.props.updateCurrentTodos
    );
  };

  removeTodo = async (id: string) => {
    console.log(this.props.todos);
    try {
      await fetch(`http://localhost:8000/todo/${id}`, {
        method: "DELETE",
      });

      const newtodos = this.props.todos.filter((todo) => todo.id !== id);
      console.log("Todos after deletion:", newtodos);

      this.setState(
        {
          todos: newtodos,
          todolistwithkw: newtodos,
        },
        () => {
          this.props.updateCurrentTodos;
          this.updateList(newtodos);
          console.log("oke remove");
        }
      );
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
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
                <th className="text-center">Giờ tạo</th>
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
                    >
                      {todo.status}
                    </span>
                  </td>
                  <td>
                    <p>{todo.date}</p>
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
                      onClick={() => this.removeTodo(todo.id)}
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
