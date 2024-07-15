import { useState } from "react";

export const App = () => {
  const [text, setText] = useState("初期値")

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <input type='submit' value="追加" onSubmit={(e) => e.preventDefault()} />
      </form>
      <p>{text}</p>
    </>
  );
};