import { useState } from "react";

type Todo = {
  readonly id: number
  value: string
  checked: boolean
  removed: boolean
};

type Filter = 'all' | 'checked' | 'unchecked' | 'removed'

export const App = () => {
  const [text, setText] = useState("")
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<Filter>('all')

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

  const handleRemoved = (removed: boolean, id: number) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id)  {
          return {...todo, removed}
        }
        return todo
      })
      return newTodos
    })
  }

  const handleSelect = (filter: Filter) => {
    setFilter(filter)
  }

  const filteredTodos = todos.filter((todo) =>{
      switch (filter) {
        case 'all':
          return todo
        case 'checked':
          return todo.checked
        case 'unchecked':
          return !todo.checked && !todo.removed
        case 'removed':
          return todo.removed
      default:
        return todo
      }
   })

  const handleSubmit = () => {
    const newTodo: Todo = {
      id: new Date().getTime(),
      value: text,
      checked: false,
      removed: false,
    }
    // set関数には関数を渡すことができる。その関数は前回のstateを引数に受け取ることができる。
    setTodos((todos) => [newTodo, ...todos])
    setText('')
  }

  return (
    <>
      <select defaultValue='all' onChange={(e) => {handleSelect(e.target.value as Filter)}}>
        <option value='all'>全て</option>
        <option value='checked'>完了</option>
        <option value='removed'>ゴミ箱</option>
        <option value='unchecked'>進行中</option>
      </select>
      <form onSubmit={(e) => {
        e.preventDefault(); 
        handleSubmit();
      }}>
        <input type="text" value={text} onChange={(e) => handleText(e)} />
        <input type='submit' value="追加" />
      </form>
      <h2>記録されたタスク</h2>
      <ul>
      {filteredTodos.map((todo) => {
        return (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.checked} onChange={() => {handleCheckbox(!todo.checked, todo.id)}} />
            <input type="text" value={todo.value} disabled={todo.checked || todo.removed} onChange={(e) => handleFormInput(e.target.value, todo.id)} />
            <button onClick={() => {handleDelete(todo.id)}}>削除</button>
            <button onClick={() => {handleRemoved(!todo.removed, todo.id)}}>削除フラグ追加</button>
          </li>
      )})}
      </ul>
    </>
  );
};