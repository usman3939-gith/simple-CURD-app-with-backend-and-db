const inputMainEl = document.getElementById("input-main-el");
const addBtn = document.querySelector(".add-btn");
const pEl = document.getElementById("p-el");
const deleteAllBtn = document.getElementById("delete-all-btn");

// Fetch all entries from backend
const fetchEntries = async () => {
    try {
        const res = await fetch("/api/entries"); // ✅ relative path
        const entries = await res.json();
        renderEntries(entries);
    } catch (err) {
        console.error("Error fetching entries:", err);
    }
};

// Render entries in the DOM
const renderEntries = (entries) => {
    let entryItems = "";
    entries.forEach((entry) => {
        entryItems += `
           <p data-id="${entry._id}">
                <span class="entry-text">${entry.entry}</span>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
           </p>
        `;
    });
    pEl.innerHTML = entryItems;
};

// Add new entry
addBtn.addEventListener("click", async () => {
    const value = inputMainEl.value.trim();
    if (!value) return;

    addBtn.setAttribute("disabled", "disabled");

    try {
        const res = await fetch("/api/entries", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ entry: value }),
        });
        await res.json();
        inputMainEl.value = "";
        fetchEntries();
    } catch (err) {
        console.error("Error adding entry:", err);
    }
});

// Enable/disable add button based on input
inputMainEl.addEventListener("input", () => {
    if (inputMainEl.value.trim().length > 0) {
        addBtn.removeAttribute("disabled");
    } else {
        addBtn.setAttribute("disabled", "disabled");
    }
});

// Delete all entries
deleteAllBtn.addEventListener("click", async () => {
    try {
        await fetch("/api/entries", { method: "DELETE" });
        fetchEntries();
    } catch (err) {
        console.error("Error deleting all entries:", err);
    }
});

// Event delegation for edit, update, cancel, delete buttons
pEl.addEventListener("click", async (e) => {
    const parent = e.target.parentElement;
    const id = parent.dataset.id;

    // Edit entry
    if (e.target.classList.contains("edit-btn")) {
        const entrySpan = parent.querySelector(".entry-text");
        const currentText = entrySpan.textContent;
        parent.innerHTML = `
            <span contenteditable="true" class="editable">${currentText}</span>
            <button class="update-btn" disabled>Update</button>
            <button class="cancel-btn">Cancel</button>
        `;
        const editableSpan = parent.querySelector(".editable");
        const updateBtn = parent.querySelector(".update-btn");
        editableSpan.focus();

        editableSpan.addEventListener("input", () => {
            if (editableSpan.textContent.trim().length > 0) {
                updateBtn.removeAttribute("disabled");
            } else {
                updateBtn.setAttribute("disabled", "disabled");
            }
        });
    }

    // Update entry
    if (e.target.classList.contains("update-btn")) {
        const editableSpan = parent.querySelector(".editable");
        const updatedValue = editableSpan.textContent.trim();
        try {
            await fetch(`/api/entries/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ entry: updatedValue }),
            });
            fetchEntries();
        } catch (err) {
            console.error("Error updating entry:", err);
        }
    }

    // Cancel edit
    if (e.target.classList.contains("cancel-btn")) {
        fetchEntries();
    }

    // Delete single entry
    if (e.target.classList.contains("delete-btn")) {
        try {
            await fetch(`/api/entries/${id}`, { method: "DELETE" });
            fetchEntries();
        } catch (err) {
            console.error("Error deleting entry:", err);
        }
    }
});

// Initial fetch on page load
fetchEntries();
