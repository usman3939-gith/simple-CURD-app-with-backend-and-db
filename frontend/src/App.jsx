import { useState, useEffect } from "react";
import api from "./api";
import EntryForm from "./components/EntryForm";
import EntryList from "./components/EntryList";

export default function App() {
  const [entries, setEntries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState("");

  // ✅ Fetch entries on mount
  useEffect(() => {
    async function fetchEntries() {
      try {
        const res = await api.get("/entries");
        setEntries(res.data);
      } catch (err) {
        console.error("Error fetching entries:", err);
      }
    }
    fetchEntries();
  }, []);

  // ✅ Add entry
  async function addEntry(entry) {
    try {
      const res = await api.post("/entries", { entry }); // <-- field name must be entry
      setEntries([...entries, res.data]);
    } catch (err) {
      console.error("Error adding entry:", err);
    }
  }

  // ✅ Delete one
  async function deleteEntry(id) {
    try {
      await api.delete(`/entries/${id}`);
      setEntries(entries.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Error deleting entry:", err);
    }
  }

  // ✅ Delete all
  async function deleteAll() {
    try {
      await api.delete("/entries");
      setEntries([]);
    } catch (err) {
      console.error("Error deleting all:", err);
    }
  }

  // ✅ Start editing
  function startEdit(id, entry) {
    setEditingId(id);
    setEditingValue(entry);
  }

  // ✅ Update
  async function updateEntry(id, entry) {
    try {
      const res = await api.put(`/entries/${id}`, { entry }); // <-- match schema
      setEntries(entries.map((e) => (e._id === id ? res.data : e)));
      setEditingId(null);
      setEditingValue("");
    } catch (err) {
      console.error("Error updating entry:", err);
    }
  }

  // ✅ Cancel edit
  function cancelEdit() {
    setEditingId(null);
    setEditingValue("");
  }

  return (
    <main>
      <EntryForm addEntry={addEntry} deleteAll={deleteAll} />
      <EntryList
        entries={entries}
        editingId={editingId}
        editingValue={editingValue}
        onEdit={startEdit}
        onUpdate={updateEntry}
        onDelete={deleteEntry}
        onCancel={cancelEdit}
        setEditingValue={setEditingValue}
      />
    </main>
  );
}
