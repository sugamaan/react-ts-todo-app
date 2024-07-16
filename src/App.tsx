import { useState } from "react";

type Todo = {
  readonly id: number
  value: string
};

export const App = () => {
  const [text, setText] = useState("")
  const [todos, setTodos] = useState<Todo[]>([])

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setText(e.target.value)
  }

  const handleFormInput = (value: string, id: number) => {
    const newTodos = todos.map((todo) => {
      if (id === todo.id) {
        todo.value = value
      }
      return todo
    })
    setTodos(newTodos)
  }

  const handleSubmit = () => {
    const newTodo: Todo = {
      id: new Date().getTime(),
      value: text
    }
    // set関数には関数を渡すことができる。その関数は前回のstateを引数に受け取ることができる。
    setTodos((todos) => [newTodo, ...todos])
    setText('')
  }

  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault(); 
        handleSubmit();
      }}>
        <input type="text" value={text} onChange={(e) => handleText(e)} />
        <input type='submit' value="追加" />
      </form>
      <h2>記録されたタスク</h2>
      <ul>
      {todos.map((todo) => {
        return <input type="text" value={todo.value} onChange={(e) => handleFormInput(e.target.value, todo.id)} />
      })}
      </ul>
    </>
  );
};