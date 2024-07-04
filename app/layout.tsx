"use client";
// import type { Metadata } from "next";
import React, { Component } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import AddWorkForm from "./pages/AddWorkForm";
import Header from "./components/Header";
import Pagination from "./components/PaginationControls";
import ToDoListButton from "./pages/ToDoListTableButton";
import ToDoListTable from "./pages/ToDoListTable";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

interface Todos {
  id: number;
  title: string;
  status: string;
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
      this.setState({ todos }, this.updateCurrentTodos);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  toggleToDoStatus = async (id: number) => {
    const clickTodo = this.state.todos.find((todo) => todo.id === id);
    if (!clickTodo) return "not found";
    const newStatus = clickTodo.status === "Kích Hoạt" ? "Ẩn" : "Kích Hoạt";

    try {
      await fetch(`http://localhost:8000/todo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...clickTodo, status: newStatus }),
      });
      const newtodos = this.state.todos.map((todo) => {
        if (todo.id === id) {
          if (todo.status === "Kích Hoạt") todo.status = "Ẩn";
          else if (todo.status === "Ẩn") todo.status = "Kích Hoạt";
          return todo;
        }
        return todo;
      });
      this.setState(
        {
          todos: newtodos,
          todolistwithkw: newtodos,
        },
        this.updateCurrentTodos
      );
      console.log("Changed todo status");
    } catch (error) {
      console.error("Failed to change todo status:", error);
    }
  };

  removeTodo = async (id: string) => {
    try {
      await fetch(`http://localhost:8000/todo/${id}`, {
        method: "DELETE",
      });
      const newtodos = this.state.todos.filter(
        (todo) => (todo.id as unknown as string) !== id
      );
      this.setState(
        {
          todos: newtodos,
          todolistwithkw: newtodos,
        },
        this.updateCurrentTodos
      );
      console.log("Deleted todo");
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  addTodo = (title: string, status: string) => {
    try {
      const newTodo: Todos = {
        id: this.state.todos.length + 1,
        title,
        status,
      };

      const newtodos = [...this.state.todos, newTodo];
      this.setState(
        {
          todos: newtodos,
          todolistwithkw: newtodos,
          isAddFormVisible: false,
        },
        this.updateCurrentTodos
      );
      // return newTodo;
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  toggleAddFormVisible = () => {
    console.log("toggle");
    this.setState((prevState) => ({
      isAddFormVisible: !prevState.isAddFormVisible,
    }));
  };

  changeTodoTitle = async (id: number, title: string) => {
    const todoToUpdate = this.state.todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;

    const updatedTodo = { ...todoToUpdate, title };

    try {
      await fetch(`http://localhost:8000/todo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });

      const newtodos = this.state.todos.map((todo) =>
        todo.id === id ? updatedTodo : todo
      );

      this.setState(
        {
          todos: newtodos,
          todolistwithkw: newtodos.filter((todo) =>
            todo.title.toLowerCase().includes(this.state.keyword.toLowerCase())
          ),
        },
        this.updateCurrentTodos
      );
      console.log("Changed todo title");
    } catch (error) {
      console.error("Failed to change todo title:", error);
    }
  };

  findTodo = (keyword: string) => {
    const todolistwithkw = this.state.todos.filter((todo) =>
      todo.title.toLowerCase().includes(keyword.toLowerCase())
    );
    this.setState({ todolistwithkw, keyword });
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
    this.setState({ todolistwithkw: this.state.currentTodos });
  };

  handleSeeAll = () => {
    this.setState({
      todos: this.state.todos,
      todolistwithkw: this.state.todos,
    });
  };

  findTodoInPage = (keyword: string) => {
    const { currentTodos } = this.state;
    const filteredTodos = currentTodos.filter((todo) =>
      todo.title.toLowerCase().includes(keyword.toLowerCase())
    );
    this.setState({ todolistwithkw: filteredTodos, keyword });
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value;
    this.setState({ keyword }, () => this.findTodoInPage(keyword));
  };

  updateCurrentTodos = () => {
    const { todos, currentPage, todoPerPage, keyword } = this.state;
    const indexOfLastTodo = currentPage * todoPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todoPerPage;
    const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
    this.setState({ currentTodos }, () => this.findTodoInPage(keyword));
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
            {/* <AddWorkForm addTodo={this.addTodo} /> */}
            {this.state.isAddFormVisible && (
              <AddWorkForm addTodo={this.addTodo} />
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
                removeTodo={this.removeTodo}
                toggleToDoStatus={this.toggleToDoStatus}
                changeTodoTitle={this.changeTodoTitle}
                // findTodoInPage={this.findTodoInPage}
                handleInputChange={this.handleInputChange}
                toggleAddFormVisible={this.toggleAddFormVisible}
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
