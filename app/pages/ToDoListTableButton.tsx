"use client";
import React, { Component } from "react";

interface ToDoListTableButtonProps {
  findTodo: (keyword: string) => void;
  sortTodoAZ: () => void;
  sortTodoZA: () => void;
  handleSeeAll: () => void;
}

interface State {
  keyword: string;
}

class ToDoListButton extends Component<ToDoListTableButtonProps, State> {
  state: State = {
    keyword: "",
  };

  handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ keyword: e.target.value });
  };

  handleFindTodo = () => {
    this.props.findTodo(this.state.keyword);
  };
  handlesortAZ = () => {
    this.props.sortTodoAZ();
  };
  handlesortZA = () => {
    this.props.sortTodoZA();
  };
  handleSeeAll = () => {
    this.props.handleSeeAll();
  };

  render() {
    return (
      <div>
        <button type="button" className="btn btn-primary mb-2">
          <span className="fa fa-plus mr-5" />
          Thêm Công Việc
        </button>
        <div className="row mt-15">
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nhập từ khóa..."
                value={this.state.keyword}
                onChange={this.handleKeywordChange}
              />
              <span className="input-group-btn">
                <button
                  className="btn btn-primary mx-2"
                  type="button"
                  onClick={this.handleFindTodo}
                >
                  <span className="fa fa-search mr-5" />
                  Tìm
                </button>
              </span>
            </div>

            <button
              className="btn btn-primary my-2"
              type="button"
              onClick={this.handleSeeAll}
            >
              Xem tất cả
              <span className="fa fa-caret-square-o-down ml-5" />
            </button>
          </div>
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id="dropdownMenu1"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="true"
              >
                Sắp Xếp <span className="fa fa-caret-square-o-down ml-5" />
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li>
                  <button className="dropdown-item" onClick={this.handlesortAZ}>
                    <span className="fa fa-sort-alpha-asc pr-5">Tên A-Z</span>
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={this.handlesortZA}>
                    <span className="fa fa-sort-alpha-desc pr-5">Tên Z-A</span>
                  </button>
                </li>
                <li role="separator" className="divider" />
                <li>
                  <button className="dropdown-item">
                    Trạng Thái Kích Hoạt
                  </button>
                </li>
                <li>
                  <button className="dropdown-item">Trạng Thái Ẩn</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    );
  }
}

export default ToDoListButton;
