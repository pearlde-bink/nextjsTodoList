"use client";
import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";

interface Todos {
  id: string;
  title: string;
  status: string;
}

interface AddWorkFormProps {
  isAddFormVisible: boolean;
  isChangeTodo: boolean;
  updateCurrentTodos: () => void;
  reState: (tdl: Todos) => void;
  todoToEdit: Todos;
  // changeTodo: (id: string, title: string, status: string) => void;
  toggleAddFormVisible: () => void;
  toggleChangeTodo: (Todo: Todos) => void;
}

interface State {
  id: string;
  title: string;
  status: string;
  todos: Todos[];
  todolistwithkw: Todos[];
  keyword: string;
  isAddFormVisible: boolean;
  isChangeTodo: boolean;
}

class AddWorkForm extends Component<AddWorkFormProps, State> {
  state: State = {
    id: "",
    title: "",
    status: "Kích Hoạt",
    todos: [],
    todolistwithkw: [],
    keyword: "",
    isAddFormVisible: false,
    isChangeTodo: false,
  };

  updateCurrentTodos = () => {
    this.props.updateCurrentTodos();
  };

  componentDidUpdate(prevProps: any) {
    if (
      this.props.todoToEdit &&
      prevProps.todoToEdit !== this.props.todoToEdit
    ) {
      this.setState({
        id: this.props.todoToEdit.id,
        title: this.props.todoToEdit.title,
        status: this.props.todoToEdit.status,
      });
    }
  }

  // addTodo = (title: string, status: string) => {
  //   try {
  //     const newTodo: Todos = {
  //       id: uuidv4(),
  //       title,
  //       status,
  //     };
  //     console.log("newTodo: ", newTodo);

  //     const newtodos = [...this.state.todos, newTodo];
  //     console.log("newtodos: ", newtodos[newtodos.length - 1]);

  //     //update in db
  //     fetch("http://localhost:8000/todo", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(newTodo),
  //     });
  //     //update in state (table)
  //     this.props.reState(newTodo);
  //   } catch (error) {
  //     console.error("Failed to add todo:", error);
  //   }
  // };

  handleSelectChange = (e: any) => {
    this.setState({ status: e.target.value });
  };

  handleChange = (e: any) => {
    this.setState({ title: e.target.value });
  };

  handleSubmit = async (e: any) => {
    e.preventDefault();
    const { id, title, status } = this.state;
    let todo = { id, title, status };
    console.log("todo:  ", todo);

    const method = id ? "PUT" : "POST";
    const IdToSubmit = id ? id : uuidv4();
    todo = { ...todo, id: IdToSubmit };

    fetch(`http://localhost:8000/todo/${id ? id : ""}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...todo,
        id: IdToSubmit,
        title: title,
        status: status,
      }),
    });

    this.props.reState(todo);
    this.props.toggleAddFormVisible();
    this.setState({ title: "", status: "Kích Hoạt" }); //reset add-form
  };

  render() {
    return (
      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <div className="panel panel-warning">
          <div className="panel-heading">
            <h3 className="panel-title">Thêm Công Việc</h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Tên :</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={this.handleChange}
                  value={this.state.title}
                />
              </div>
              <label>Trạng Thái :</label>
              <select
                onChange={this.handleSelectChange}
                className="form-control"
                value={this.state.status}
                required
              >
                <option value={"Kích hoạt"}>Kích Hoạt</option>
                <option value={"Ẩn"}>Ẩn</option>
              </select>
              <br />
              <div className="text-center">
                <button type="submit" className="btn btn-warning">
                  Thêm
                </button>
                &nbsp;
                <button type="submit" className="btn btn-danger">
                  Hủy Bỏ
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddWorkForm;
