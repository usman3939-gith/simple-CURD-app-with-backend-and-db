export default function EntryItem({
  entry,
  editingId,
  editingValue,
  onEdit,
  onUpdate,
  onCancel,
  setEditingValue,
  onDelete,
}) {
  return (
    <li>
      {editingId === entry._id ? ( // ✅ use _id instead of id
        <>
          <input
            type="text"
            value={editingValue}
            onChange={(e) => setEditingValue(e.target.value)}
          />
          <button
            className="update-btn"
            onClick={() => onUpdate(entry._id, editingValue)} // ✅ pass new value
            disabled={!editingValue.trim()}
          >
            Update
          </button>
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <span>{entry.entry}</span> {/* ✅ schema field is "entry" */}
          <button onClick={() => onEdit(entry._id, entry.entry)}>Edit</button>
          <button onClick={() => onDelete(entry._id)}>Delete</button>
        </>
      )}
    </li>
  );
}
