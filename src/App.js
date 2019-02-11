import React, { Component } from "react";

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
  }

  setInput = e => {
    const input = e.target.value;

    this.setState({ input: input });
  };

  render() {
    return (
      <div>
        <input value={this.state.input} onChange={this.setInput} />
        <button
          onClick={() => {
            const name = this.state.input;
            if (name.trim()) {
              this.props.addTodo(name);
              this.setState({ input: "" });
            }
          }}
        >
          Add Todo
        </button>
      </div>
    );
  }
}

const TodosToShow = props => {
  const { currentFilter } = props;
  let todosToShow = props.todos;

  if (currentFilter === "active") {
    todosToShow = todosToShow.filter(value => !value.completed);
  } else if (currentFilter === "completed") {
    todosToShow = todosToShow.filter(value => value.completed);
  }
  return (
    <ul>
      {todosToShow.map((value, index) => {
        return (
          <li
            key={index}
            onClick={() => {
              props.toggleTodo(index);
            }}
            style={{
              textDecoration: value.completed ? "line-through" : "none"
            }}
          >
            {value.name}
          </li>
        );
      })}
    </ul>
  );
};

const Filter = props => (
  <div>
    <button
      onClick={() => {
        props.setFilter("all");
      }}
      disabled={props.currentFilter === "all"}
    >
      All
    </button>
    <button
      onClick={() => {
        props.setFilter("active");
      }}
      disabled={props.currentFilter === "active"}
    >
      Active
    </button>
    <button
      onClick={() => {
        props.setFilter("completed");
      }}
      disabled={props.currentFilter === "completed"}
    >
      Completed
    </button>
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [], filter: "all", curInput: "" };
  }

  addTodo = name => {
    this.setState({
      todos: [...this.state.todos, { name: name, completed: false }]
    });
    console.log(`this.state.todos: ${this.state.todos}`);
    this.state.todos.forEach(value => {
      console.log(`name: ${value.name}, completed: ${value.completed}`);
    });
  };

  toggleTodo = index => {
    this.setState({
      todos: [
        ...this.state.todos.slice(0, index),
        {
          ...this.state.todos[index],
          completed: !this.state.todos[index].completed
        },
        ...this.state.todos.slice(index + 1)
      ]
    });
  };

  setFilter = filter => {
    this.setState({ filter: filter });
  };

  render() {
    return (
      <div>
        <AddTodo addTodo={this.addTodo} />
        <TodosToShow
          todos={this.state.todos}
          toggleTodo={this.toggleTodo}
          currentFilter={this.state.filter}
        />
        <Filter setFilter={this.setFilter} currentFilter={this.state.filter} />
      </div>
    );
  }
}

export default App;
