import React, { useEffect, useState } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { createTodo } from "./graphql/mutations";
import { listTodos } from "./graphql/queries";

import PayButton from "./components/PayButton/PayButton";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);
const initialState = { name: "", description: "" };
const App = () => {
  const [formState, setFormState] = useState(initialState);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);
  const setInput = (key, value) => {
    setFormState({ ...formState, [key]: value });
  };
  const fetchTodos = async () => {
    try {
      const todoDate = await API.graphql(graphqlOperation(listTodos));
      const todos = todoDate.data.listTodos.items;
      setTodos(todos);
    } catch (err) {
      console.log("error fetching todos");
    }
  };
  const addTodo = async () => {
    try {
      if (!formState.name || !formState.description) return;
      const todo = { ...formState };
      setTodos([...todos, todo]);
      setFormState(initialState);
      await API.graphql(graphqlOperation(createTodo, { input: todo }));
    } catch (err) {
      console.log("error createing todo:", err);
    }
  };
  return (
    <div style={styles.container}>
      <h2>Amplify Todos</h2>
      <input
        onChange={(event) => setInput("name", event.target.value)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <input
        onChange={(event) => setInput("description", event.target.value)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
      />
      <button style={styles.button} onClick={addTodo}>
        Create Todo
      </button>
      {todos.map((todo, index) => (
        <div key={todo.id ? todo.id : index} style={styles.todo}>
          <p style={styles.todoName}>{todo.name}</p>
          <p style={styles.todoDescription}>{todo.description}</p>
        </div>
      ))}
      <PayButton
        stripePublicKey="pk_test_51IlxItCctdIGJZxzQkP85Oqi4B7VTdq3Njk5eJlyEvZWWad70MBfFE8QM25kANTzrx13OrB2fO1s4Ccq2kHCsjG100WB8HSxW0"
        apiName="stripeapi"
        apiEndpoint="/checkout"
        name="T-shirt"
        description="Comfortable cotton t-shirt"
        images={["http://lorempixel.com/400/200/"]}
        amount={550}
        currency="usd"
        quantity={1}
        success_url="http://localhost:3000" // Where to redirect if success
        cancel_url="http://localhost:3000" // Where to go if payment canceled
      />
    </div>
  );
};

const styles = {
  container: {
    width: 400,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
  },
  todo: { marginBottom: 15 },
  input: {
    border: "none",
    backgroundColor: "#ddd",
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
  },
  todoName: { fontSize: 20, fontWeight: "bold" },
  todoDescription: { marginBottom: 0 },
  button: {
    backgroundColor: "black",
    color: "white",
    outline: "none",
    fontSize: 18,
    padding: "12px 0px",
  },
};

export default App;
