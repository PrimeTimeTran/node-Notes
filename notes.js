const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
    notes.push({
      body,
      title
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("Adding note!"));
  } else {
    console.log(chalk.red.inverse("Already have this note"));
  }
};

const removeNote = title => {
  const notes = loadNotes();
  const notesToKeep = notes.filter(note => note.title !== title);
  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse("Note Removed!"));
    saveNotes(notesToKeep);
    console.table([notesToKeep]);
  } else {
    console.log(chalk.red.inverse("Note not found"));
  }
};

const readNote = title => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);
  if (note) {
    console.log(chalk.green.inverse("Note found!"));
    console.table([note]);
  } else {
    console.log(chalk.red.inverse("Not Found!"));
  }
};

const list = () => {
  const notes = loadNotes();
  console.table(notes);
};

const saveNotes = notes => {
  const json = JSON.stringify(notes);
  fs.writeFileSync("./notes.json", json);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const json = dataBuffer.toString();
    return JSON.parse(json);
  } catch (error) {
    return [];
  }
};


module.exports = {
  list,
  addNote,
  readNote,
  removeNote
};
