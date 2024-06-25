"use client";
import React, { Component } from "react";

interface AddWorkFormProps {
  addTodo: (title: string, status: string) => void;
}

class AddWorkForm extends Component<AddWorkFormProps> {
  state = {
    title: "",
    status: "Kích Hoạt",
  };

  handleSelectChange = (e: any) => {
    this.setState({ status: e.target.value });
  };

  handleChange = (e: any) => {
    this.setState({ title: e.target.value });
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.addTodo(this.state.title, this.state.status);
    this.setState({ title: "", status: "Kích Hoạt" });
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
