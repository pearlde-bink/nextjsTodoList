"use client";
import React, { Component } from "react";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AddWorkForm from "./pages/AddWorkForm";
import Header from "./components/Header";
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
}

class RootLayout extends Component<{}, State> {
  state: State = {
    todos: [
      { id: 0, title: "Học lập trình", status: "Kích Hoạt" },
      { id: 1, title: "Đọc sách", status: "Ẩn" },
      { id: 2, title: "Uống nước", status: "Kích Hoạt" },
      { id: 3, title: "Nghe nhạc", status: "Kích Hoạt" },
    ],
  };

  addTodo = (title: string, status: string) => {
    const newTodo = {
      id: this.state.todos.length + 1,
      title,
      status,
    };

    this.setState((prevState) => ({
      todos: [...prevState.todos, newTodo],
    }));
    console.log("added");
  };

  removeTodo = (id: number) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.id != id),
    }));
    console.log("deleted");
  };

  toggleToDoStatus = (id: number) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            status: todo.status === "Kích Hoạt" ? "Ẩn" : "Kích Hoạt",
          };
        }
        return todo;
      }),
    }));
  };

  render() {
    return (
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <div className="row">
            <AddWorkForm addTodo={this.addTodo} />
            <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
              <ToDoListButton></ToDoListButton>

              <ToDoListTable
                todos={this.state.todos}
                removeTodo={this.removeTodo}
                toggleToDoStatus={this.toggleToDoStatus}
              ></ToDoListTable>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

export default RootLayout;
