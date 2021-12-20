const fs = require('fs')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// starting express app to serve comminication with $store
const app = express()
app.use(cors())
app.use(bodyParser.json())

// create new virtual machine
const { Vm } = require('@bluepjs/vm')
const vm = new Vm()

// for simplicity sample database saved in json file
// because library structure is fully JSON compatible
const db = JSON.parse(fs.readFileSync('./db.json').toString())
vm.updateLibraries(db.libraries)

// creating demo actor
const DemoActor = require('./src/actor')
// actor ID should be unique
// library functions and events currently are "actor-id-dependend"
// sample library configured for used id
const demoActor = new DemoActor('90df7b49-7f94-4ac7-9bec-3193f20908b9')
vm.M('actor').addActor(demoActor)

// express endpoints

// information from virtual machine for IDE
app.get('/vm', (req, res) => {
  res.json(vm.ideData())
})

// libraries save endpoint to save libraries
app.post('/libraries/save', (req, res) => {
  const libs = req.body.libraries
  fs.writeFileSync('./db.json', JSON.stringify({ libraries: libs }, null, 2))
  vm.updateLibraries(libs)
  res.json(libs)
})

// endpoint to run function from IDE
app.get('/run/:library/:code', (req, res) => {
  const info = {
    library: req.params.library,
    code: req.params.code
  }
  vm.runFunction(info)
    .then(result => {
      res.json({ result })
    })
    .catch(error => {
      console.log('run error', error)
      res.json({ error: error.toString() })
    })
})

// starting backend server on 8008 port for example
// frontend $store configured to do requests here
app.listen(8008, () => {
  console.log('listening on', 8008)
})
