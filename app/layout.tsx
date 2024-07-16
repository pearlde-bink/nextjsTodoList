"use client";

import React, { Component } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import AddWorkForm from "./pages/AddWorkForm";
import Header from "./components/Header";
import Pagination from "./components/PaginationControls";
import ToDoListButton from "./pages/ToDoListTableButton";
import ToDoListTable from "./pages/ToDoListTable";

const inter = Inter({ subsets: ["latin"] });

interface Todos {
  id: string;
  title: string;
  status: string;
  date: string;
}

interface State {
  todos: Todos[];
  todolistwithkw: Todos[];
  keyword: string;
  currentPage: number;
  todoPerPage: number;
  indexOfLastTodo: number;
  indexOfFirstTodo: number;
  currentTodos: Todos[];
  isAddFormVisible: boolean;
  isChangeTodo: boolean;
  todoToEdit: Todos;
}

class RootLayout extends Component<{}, State> {
  state: State = {
    todos: [],
    todolistwithkw: [],
    keyword: "",
    currentPage: 1,
    todoPerPage: 5,
    indexOfLastTodo: 4,
    indexOfFirstTodo: 0,
    currentTodos: [],
    isAddFormVisible: false,
    isChangeTodo: false,
    todoToEdit: { id: "", title: "", status: "", date: "" },
  };

  reState = (tdl: Todos) => {
    const newtodolist = this.state.todos.map((todo) =>
      todo.id === tdl.id ? tdl : todo
    );

    // Check if the todo is not already in the list, then add it
    if (!this.state.todos.find((todo) => todo.id === tdl.id)) {
      newtodolist.push(tdl);
    }

    newtodolist.sort((b: Todos, a: Todos) => a.date.localeCompare(b.date));

    this.setState(
      { todos: newtodolist, todolistwithkw: newtodolist },
      this.updateCurrentTodos
    );
  };

  setCurrentPage = (pageNum: number) => {
    this.setState({ currentPage: pageNum }, this.updateCurrentTodos);
  };

  componentDidMount(): void {
    //to fetch data
    this.fetchTodos();
  }

  fetchTodos = async () => {
    try {
      const res = await fetch("http://localhost:8000/todo");
      const todos = await res.json();

      todos.sort((b: Todos, a: Todos) => a.date.localeCompare(b.date));
      this.setState({ todos }, this.updateCurrentTodos);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  toggleAddFormVisible = () => {
    this.setState((prevState) => ({
      isAddFormVisible: !prevState.isAddFormVisible,
    }));
    this.setState({
      isChangeTodo: false,
    });
  };

  toggleChangeTodo = (todo: Todos) => {
    this.setState((prevState) => ({
      isChangeTodo: !prevState.isChangeTodo,
    }));
    this.setState({
      todoToEdit: todo,
      isAddFormVisible: false,
      isChangeTodo: true,
    });
  };

  findTodo = (keyword: string) => {
    const todolistwithkw = this.state.todos.filter((todo) =>
      todo.title.toLowerCase().includes(keyword.toLowerCase())
    );
    this.setState({ todolistwithkw, keyword });
  };

  findTodoInPage = (keyword: string) => {
    const { currentTodos } = this.state;
    const filteredTodos = currentTodos.filter(
      (todo) => todo && todo.title.toLowerCase().includes(keyword.toLowerCase())
    );
    this.setState({ todolistwithkw: filteredTodos, keyword });
  };

  sortTodoAZ = () => {
    const sortedTodos = this.state.todolistwithkw
      .slice()
      .sort((a, b) => a.title.localeCompare(b.title));
    this.setState({ todolistwithkw: sortedTodos });
  };

  sortTodoZA = () => {
    const sortedTodos = this.state.todolistwithkw
      .slice()
      .sort((b, a) => a.title.localeCompare(b.title));
    this.setState({ todolistwithkw: sortedTodos });
  };

  sortActivate = () => {
    const sortActivateList = this.state.currentTodos.filter(
      (todo) => todo.status === "Kích Hoạt"
    );

    this.setState({ todolistwithkw: sortActivateList });
  };

  sortDeactivate = () => {
    const sortDeactivateList = this.state.currentTodos.filter(
      (todo) => todo.status === "Ẩn"
    );

    this.setState({ todolistwithkw: sortDeactivateList });
  };

  seeAllCurrent = () => {
    this.setState({
      todolistwithkw: this.state.currentTodos,
    });
  };

  handleSeeAll = () => {
    this.setState({
      todos: this.state.todos,
      todolistwithkw: this.state.todos,
    });
  };

  updateCurrentTodos = () => {
    const { todos, currentPage, todoPerPage, keyword } = this.state;
    const indexOfLastTodo = currentPage * todoPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todoPerPage;
    const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
    this.setState({ currentTodos }, () => this.findTodoInPage(keyword));
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value;
    this.setState({ keyword }, () => this.findTodoInPage(keyword));
  };

  hadlePageChange = (pageNum: number) => {
    //change todo list when click pagination
    this.setCurrentPage(pageNum);
  };

  render() {
    return (
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <div className="row">
            {(this.state.isAddFormVisible || this.state.isChangeTodo) && (
              <AddWorkForm
                updateCurrentTodos={this.updateCurrentTodos}
                isAddFormVisible={this.state.isAddFormVisible}
                isChangeTodo={this.state.isChangeTodo}
                todoToEdit={this.state.todoToEdit}
                reState={this.reState}
                // changeTodo={this.changeTodo}
                toggleAddFormVisible={this.toggleAddFormVisible}
                toggleChangeTodo={this.toggleChangeTodo}
              />
            )}
            <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
              <ToDoListButton
                findTodo={this.findTodo}
                sortTodoAZ={this.sortTodoAZ}
                sortTodoZA={this.sortTodoZA}
                handleSeeAll={this.handleSeeAll}
                sortActivate={this.sortActivate}
                sortDeactivate={this.sortDeactivate}
                seeAllCurrent={this.seeAllCurrent}
                toggleAddFormVisible={this.toggleAddFormVisible}
              />
              <ToDoListTable
                todos={this.state.todolistwithkw}
                todolistwithkw={this.state.todolistwithkw}
                // removeTodo={this.removeTodo}
                toggleAddFormVisible={this.toggleAddFormVisible}
                handleInputChange={this.handleInputChange}
                toggleChangeTodo={this.toggleChangeTodo}
                reState={this.reState}
                updateCurrentTodos={this.updateCurrentTodos}
              />
            </div>
          </div>
          <Pagination
            todoPerPage={this.state.todoPerPage}
            length={this.state.todos.length}
            setCurrentPage={this.setCurrentPage}
            handlePageChange={this.hadlePageChange}
          />
        </body>
      </html>
    );
  }
}

export default RootLayout;
