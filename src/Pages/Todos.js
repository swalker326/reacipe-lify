import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { createTodo, deleteTodo } from "../graphql/mutations";
import { listTodos } from "../graphql/queries";
import awsExports from "../aws-exports";

Amplify.configure(awsExports);

const initialState = { name: "", description: "" };

const Todos = () => {
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
  const removeTodo = async (todoId) => {
    try {
      await API.graphql(
        graphqlOperation(deleteTodo, { input: { id: todoId } })
      ).then(() => fetchTodos())
    } catch (err) {
      console.log("Error delete todo: ", err);
    }
  };

  return (
    <Container fluid="md" style={styles.container}>
      <h2>Amplify Todos</h2>
      <Form>
        <Form.Control
          className="mt-1 mb-1"
          onChange={(event) => setInput("name", event.target.value)}
          placeholder="Name"
          value={formState.name}
        />
        <Form.Control
          className="mt-1 mb-1"
          as="textarea"
          rows={5}
          onChange={(event) => setInput("description", event.target.value)}
          placeholder="Description"
          value={formState.description}
          style={{ resize: "none" }}
        />
      </Form>
      <Button className="mt-3 mb-3" variant="primary" onClick={addTodo}>
        Create Todo
      </Button>
      <h3>To Dos:</h3>
      {todos
        .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
        .map((todo, index) => (
          <div key={todo.id ? todo.id : index} style={styles.todo}>
            <Button
              variant="danger"
              style={styles.closeButton}
              onClick={() => removeTodo(todo.id)}
            >
              X
            </Button>
            <p style={styles.todoName}>{todo.name}</p>
            <p style={styles.todoDescription}>{todo.description}</p>
          </div>
        ))}
    </Container>
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
  closeButton: {
    float: "right",
    padding: 4,
  },
  todo: {
    marginBottom: 15,
    border: "1px solid #b9b9b9",
    padding: "30px 15px",
    borderRadius: 10,
  },
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

export default Todos;
