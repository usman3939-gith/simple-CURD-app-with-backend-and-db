import EntryItem from "./EntryItem";

export default function EntryList({
  entries,
  editingId,
  editingValue,
  onEdit,
  onUpdate,
  onCancel,
  setEditingValue,
  onDelete,
}) {
  // Ensure entries is always an array
  const safeEntries = Array.isArray(entries) ? entries : [];

  return (
    <ul>
      {safeEntries.map((entry) => (
        <EntryItem
          key={entry._id} // use _id from MongoDB
          entry={entry}
          editingId={editingId}
          editingValue={editingValue}
          onEdit={onEdit}
          onUpdate={onUpdate}
          onCancel={onCancel}
          setEditingValue={setEditingValue}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
