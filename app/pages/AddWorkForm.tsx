"use client";
import React, { Component } from "react";

interface AddWorkFormProps {
  addTodo: (title: string, status: string) => void;
}

interface State {
  title: string;
  status: string;
}

class AddWorkForm extends Component<AddWorkFormProps, State> {
  state: State = {
    title: "",
    status: "Kích Hoạt",
  };

  handleSelectChange = (e: any) => {
    this.setState({ status: e.target.value });
  };

  handleChange = (e: any) => {
    this.setState({ title: e.target.value });
  };

  // handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   this.setState({ [e.target.name]: e.target.value } as Pick<
  //     State,
  //     keyof State
  //   >);
  // };

  handleSubmit = (e: any) => {
    e.preventDefault();
    const { title, status } = this.state;

    const todo = {
      title: title,
      status: status,
    };
    // const todo = this.props.addTodo(this.state.title, this.state.status);
    this.props.addTodo(title, status);
    //update in db
    fetch("http://localhost:8000/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

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
