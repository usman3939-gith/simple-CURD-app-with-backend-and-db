import { useState } from "react";

export default function EntryForm({ addEntry, deleteAll }) {
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!inputValue.trim()) return;
    addEntry(inputValue); // call prop from App
    setInputValue("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="input"
        type="text"
        placeholder="write something"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit" disabled={!inputValue.trim()}>
        Add
      </button>
      <button type="button" onClick={deleteAll}>
        Delete All
      </button>
    </form>
  );
}
