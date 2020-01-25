const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes.js");

yargs.command({
  command: "add",
  builder: {
    title: {
      demandOption: true
    },
    body: {
      demandOption: true
    }
  },
  handler: function(argv) {
    notes.addNotes(argv.title, argv.body);
  }
});

yargs.command({
  command: "remove",
  builder:{
    title:{
      demandOption:true
    }
    
  },
  handler: function(argv) {
    notes.removeNotes(argv.title);
  }
});

yargs.command({
  command: "list",
  handler: function() {
    console.log("listing");
  }
});

yargs.command({
  command: "read",
  handler: function() {
    console.log("reading");
  }
});

console.log(yargs.argv)


