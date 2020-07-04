const yargs = require('yargs')
const notes = require('./notes.js')

yargs.version('1.1.0')

yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true, 
      type: 'string'
    },
    body: {
      describe: 'Note body',
      demandOption: true, 
      type: 'string'
    },
  },
  handler: (argv) => {
    notes.addNote(argv.title, argv.body)
  }
})
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  handler: (argv) => {
    notes.removeNote(argv.title)
  }
})
yargs.command({
  command: 'list',
  describe: 'List all notes',
  handler: (argv) => {
    notes.list()
  }
})
yargs.command({
  command: 'read',
  describe: 'Read a note',
  handler: (argv) => {
    notes.readNote(argv.title)
  }
})

yargs.parse()