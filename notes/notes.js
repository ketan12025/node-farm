const fs = require("fs");

var getNotes = () => {
  return "y notes";
};

var addNotes = (title, body) => {
  const notes = loadNotes();

  const duplicate = notes.filter(function(note) {
    return note.title == title;
  });

  if (duplicate.length == 0) {
    notes.push({ title: title, body: body });
  }
  saveNotes(notes);
};

const removeNotes = title => {
  const notes = loadNotes();
  const notesToRem = notes.filter(function(note) {
          return note.title != title;
  }
  )
  saveNotes(notesToRem);
};

const saveNotes = notes => {
  const dataJason = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJason);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJason = dataBuffer.toString();
    return JSON.parse(dataJason);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNotes: addNotes,
  getNotes: getNotes,
  removeNotes: removeNotes
};
