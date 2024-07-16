import { useState } from "react";

type Todo = {
  readonly id: number
  value: string
  checked: boolean
};

export const App = () => {
  const [text, setText] = useState("")
  const [todos, setTodos] = useState<Todo[]>([])

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setText(e.target.value)
  }

  const handleFormInput = (value: string, id: number) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (id === todo.id) {
          // 以下スプレッド構文は要復習
          return {...todo, value: value}
        }
        return todo
      })
      return newTodos
    })
  }
  const handleCheckbox = (checked: boolean, id: number) => {
    setTodos((todos) =>{
      const newTodos = todos.map((todo) =>{
        if (todo.id === id) {
          return {...todo, checked: checked}
        }
        return todo
      })
      return newTodos
    })
  }

  const handleDelete = (id: number) => {
    setTodos((todos) => {
      const newTodos = todos.filter((todo) => {
        return todo.id != id
      })
      return newTodos
    })
  }

  const handleSubmit = () => {
    const newTodo: Todo = {
      id: new Date().getTime(),
      value: text,
      checked: false
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
        return (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.checked} onChange={() => {handleCheckbox(!todo.checked, todo.id)}} />
            <input type="text" value={todo.value} disabled={todo.checked} onChange={(e) => handleFormInput(e.target.value, todo.id)} />
            <button onClick={() => {handleDelete(todo.id)}}>削除</button>
          </li>
      )})}
      </ul>
    </>
  );
};