const Entry = require('../model/Entry');


const getEntries = async (req, res) => {
    try {
        const entries = await Entry.find();
        res.json(entries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



const createEntry = async (req, res) => {
    try {
        const newEntry = new Entry(req.body);
        const savedEntry = await newEntry.save();
        res.status(201).json(savedEntry);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateEntry = async (req, res) => {
    try {
        const updatedEntry = await Entry.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedEntry) {
            return res.status(404).json({ message: 'Entry not found' });
        }
        res.json(updatedEntry);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


const deleteEntry = async (req, res) => {
    try {
        const deletedEntry = await Entry.findByIdAndDelete(req.params.id);
        if (!deletedEntry) {
            return res.status(404).json({ message: 'Entry not found' });
        }
        res.json(deletedEntry);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const deleteAllEntries = async (req, res) => {
    try {
        await Entry.deleteMany({});
        res.json({ message: 'All entries deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getEntries,
    createEntry,
    updateEntry,
    deleteEntry,
    deleteAllEntries
};
